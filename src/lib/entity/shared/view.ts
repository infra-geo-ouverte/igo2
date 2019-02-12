import { BehaviorSubject, Observable, Subscription, combineLatest, zip } from 'rxjs';
import { debounceTime, map, skip } from 'rxjs/operators';

import { naturalCompare } from 'src/lib/utils/sort';
import {
  EntityFilterClause,
  EntitySortClause,
  EntityJoinClause
} from './entity.interfaces';

/**
 * An entity view streams entities from an observable source. These entities
 * can be filtered or sorted without affecting the source. A view can also
 * combine data from multiple sources, joined together.
 */
export class EntityView<E extends object, V extends object = E> {

  /**
   * Observable stream of values
   */
  readonly values$ = new BehaviorSubject<V[]>([]);

  /**
   * Whether this view has been lifted
   */
  private lifted: boolean = false;

  /**
   * Join clauses
   */
  private joins: EntityJoinClause[] = [];

  /**
   * Observable of a filter clause
   */
  private filter$ = new BehaviorSubject(undefined);

  /**
   * Observable of a sort clause
   */
  private sort$ = new BehaviorSubject(undefined);

  /**
   * Subscription to the source (and joined sources) values
   */
  private values$$: Subscription;

  /**
   * Whether there are pending operations
   */
  get empty(): boolean { return this.values$.value.length === 0; }

  constructor(private source$: BehaviorSubject<E[]>) {}

  /**
   * Get all the values
   * @returns Array of values
   */
  all(): V[] {
    return this.values$.value;
  }

  /**
   * Observe all the values
   * @returns Observable of values
   */
  all$(): BehaviorSubject<V[]> {
    return this.values$;
  }

  /**
   * Get the first value that respects a criteria
   * @returns A value
   */
  firstBy(clause: EntityFilterClause<V>): V {
    return this.values$.value.find(clause);
  }

  /**
   * Observe the first value that respects a criteria
   * @returns Observable of a value
   */
  firstBy$(clause: EntityFilterClause<V>): Observable<V> {
    return this.values$.pipe(map((values: V[]) => values.find(clause)));
  }

  /**
   * Get all the values that respect a criteria
   * @returns Array of values
   */
  manyBy(clause: EntityFilterClause<V>): V[] {
    return this.values$.value.filter(clause);
  }

  /**
   * Observe all the values that respect a criteria
   * @returns Observable of values
   */
  manyBy$(clause: EntityFilterClause<V>): Observable<V[]> {
    return this.values$.pipe(map((values: V[]) => values.filter(clause)));
  }

  /**
   * Clear the filter and sort and unsubscribe from the source
   */
  clear() {
    this.filter(undefined);
    this.sort(undefined);
  }

  destroy() {
    if (this.values$$ !== undefined) {
      this.values$$.unsubscribe();
    }
    this.clear();
  }

  /**
   * Join another source to the stream (chainable)
   * @param clause Join clause
   * @returns The view
   */
  join(clause: EntityJoinClause): EntityView<E, V> {
    if (this.lifted === true) {
      throw new Error('This view has already been lifted, therefore, no join is allowed.');
    }
    this.joins.push(clause);
    return this;
  }

  /**
   * Filter values (chainable)
   * @param clause Filter clause
   * @returns The view
   */
  filter(clause: EntityFilterClause<V>): EntityView<E, V> {
    this.filter$.next(clause);
    return this;
  }

  /**
   * Sort values (chainable)
   * @param clauseSort clause
   * @returns The view
   */
  sort(clause: EntitySortClause<V>): EntityView<E, V> {
    this.sort$.next(clause);
    return this;
  }

  /**
   * Create the final observable
   * @returns Observable
   */
  lift() {
    this.lifted = true;
    const source$ = this.joins.length > 0 ? this.liftJoinedSource() : this.liftSource();
    this.values$$ = combineLatest(source$, this.filter$, this.sort$)
      .pipe(skip(1), debounceTime(50))
      .subscribe((bunch: [V[], EntityFilterClause, EntitySortClause]) => {
        const [values, filter, sort] = bunch;
        this.values$.next(this.processValues(values, filter, sort));
      });
  }

  /**
   * Create the source observable when no joins are defined
   * @returns Observable
   */
  private liftSource(): Observable<V[]> {
    return this.source$ as any as Observable<V[]>;
  }

  /**
   * Create the source observable when joins are defined
   * @returns Observable
   */
  private liftJoinedSource(): Observable<V[]> {
    const sources$ = [this.source$, combineLatest(
      ...this.joins.map((join: EntityJoinClause) => join.source)
    )];

    return combineLatest(...sources$)
      .pipe(
        map((bunch: [E[], any[]]) => {
          const [entities, joinData] = bunch;
          return entities.reduce((values: V[], entity: E) => {
            const value = this.computeJoinedValue(entity, joinData);
            if (value !== undefined) {
              values.push(value);
            }
            return values;
          }, []);
        })
      );
  }

  /**
   * Apply joins to a source's entity and return the final value
   * @returns Final value
   */
  private computeJoinedValue(entity: E, joinData: any[]): V | undefined {
    let value = entity as Partial<V>;
    let joinIndex = 0;
    while (value !== undefined && joinIndex < this.joins.length) {
      value = this.joins[joinIndex].reduce(value, joinData[joinIndex]);
      joinIndex += 1;
    }
    return value as V;
  }

  /**
   * Filter and sort values before streaming them
   * @param values Values
   * @param filter Filter clause
   * @param sort Sort clause
   * @returns Filtered and sorted values
   */
  private processValues(values: V[], filter: EntityFilterClause, sort: EntitySortClause): V[] {
    values = values.slice(0);
    values = this.filterValues(values, filter);
    values = this.sortValues(values, sort);
    return values;
  }

  /**
   * Filter values
   * @param values Values
   * @param filter Filter clause
   * @returns Filtered values
   */
  private filterValues(values: V[], clause: EntityFilterClause): V[] {
    if (clause === undefined) { return values; }
    return values.filter((value: V) => clause(value));
  }

  /**
   * Sort values
   * @param values Values
   * @param sort Sort clause
   * @returns Sorted values
   */
  private sortValues(values: V[], clause: EntitySortClause): V[] {
    if (clause === undefined) { return values; }
    return values.sort((v1: V, v2: V) => {
      return naturalCompare(
        clause.valueAccessor(v1),
        clause.valueAccessor(v2),
        clause.direction
      );
    });
  }
}
