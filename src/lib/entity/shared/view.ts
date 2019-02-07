import { Observable, BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { debounceTime, finalize, map, publishReplay } from 'rxjs/operators';

import { Entity, EntityFilterClause, EntitySortClause } from './entity.interfaces';
import { filterEntities, sortEntities } from './entity.utils';

export class View<T extends Entity = Entity> {

  private filters$: BehaviorSubject<EntityFilterClause[]> = new BehaviorSubject([]);
  private sort$: BehaviorSubject<EntitySortClause> = new BehaviorSubject(undefined);
  private view$: Observable<T[]>;
  private view$$: Subscription;

  constructor(private source$: BehaviorSubject<T[]>) {}

  lift(): Observable<T[]> {
    const view$ = combineLatest(
      this.source$,
      this.filters$,
      this.sort$
    );

    return view$
      .pipe(
        // debounceTime(50),
        map((values: [T[], EntityFilterClause[], EntitySortClause]) => {
          const [entities, filterClauses, sortClause] = values;
          // const filtered = filterEntities(entities.slice(), filterClauses);
          const filtered = [];
          const sorted = sortEntities(filtered, sortClause.property, sortClause.direction);
          return sorted as T[];
        }),
        finalize(() => {
          if (this.view$$ !== undefined) {
            this.view$$.unsubscribe();
          }
        }),
        publishReplay()
      );
  }

  subscribe(callback: (value: T[]) => void): Observable<T[]> {
    if (this.view$ === undefined) {
      this.view$ = this.lift();
    }
    return this.view$;
  }
}
