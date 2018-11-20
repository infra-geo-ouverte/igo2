import { BehaviorSubject, Observable, Subject, Subscription, combineLatest, merge } from 'rxjs';
import { debounceTime, map, skip, startWith } from 'rxjs/operators';

import { Entity, EntityClass, State, EntitySortClause } from './entity.interface';
import { EntityState } from './state';
import { EntitySorter } from './sorter';
import { getEntityId } from './entity.utils';

export class EntityStore<T extends Entity | EntityClass, S extends { [key: string]: boolean } = State> {

  private entities$ = new BehaviorSubject<T[]>([]);
  private watcher$$: Subscription;

  get state(): EntityState<S> {
    return this._state;
  }
  private _state: EntityState<S>;

  get sorter(): EntitySorter<T> {
    return this._sorter;
  }
  private _sorter: EntitySorter<T>;

  get observable(): BehaviorSubject<T[]> {
    return this._observable$;
  }
  private _observable$ = new BehaviorSubject<T[]>(this.entities);

  get rawObservable(): BehaviorSubject<T[]> {
    return this.entities$;
  }

  get entities(): T[] {
    return this.rawObservable.value;
  }

  get empty(): boolean {
    return this.entities.length === 0;
  }

  constructor(state?: EntityState<S>) {
    if (state === undefined) {
      state = new EntityState<S>();
    }
    this._state = state;
    this._sorter = new EntitySorter();
    this.watchChanges();
  }

  clear(soft = false) {
    this.setEntities([], soft);
  }

  setEntities(entities: T[], soft = false) {
    this.entities$.next(entities);
    if (soft === false) {
      this.state.reset();
      this.sorter.reset();
    }
  }

  addEntities(entities: T[], soft = false) {
    this.setEntities(this.entities.concat(entities), soft);
  }

  getEntityById(id: string): T {
    return this.entities.find((entity: T) => getEntityId(entity) === id);
  }

  getEntityState(entity: T): S {
    return this.state.getByKey(getEntityId(entity)) || {} as S;
  }

  updateEntityState(entity: T, changes: { [key: string]: boolean }, exclusive = false) {
    this.state.updateByKey(getEntityId(entity), changes, exclusive);
  }

  updateAllEntitiesState(changes: { [key: string]: boolean }) {
    this.state.updateAll(changes);
  }

  observeBy(filterBy: (entity: T, state: S) => boolean): Observable<T[]> {
    return this.observable
      .pipe(
        map((entities: T[]) => {
          return entities.filter((entity: T) => {
            return filterBy(entity, this.getEntityState(entity));
          });
        })
      );
  }

  observeFirstBy(filterBy: (entity: T, state: S) => boolean): Observable<T> {
    return this.observable
      .pipe(
        map((entities: T[]) => {
          return entities.find((entity: T) => {
            return filterBy(entity, this.getEntityState(entity));
          });
        })
      );
  }

  private watchChanges() {
    const combined$ = combineLatest(
      this.entities$,
      this.state.observable,
      this.sorter.observable
    );

    this.watcher$$ = combined$
      .pipe(
        skip(1),
        debounceTime(50),
      ).subscribe((value: [T[], Map<string, S>, EntitySortClause]) => {
        this.observable.next(this.sorter.sort(value[0]));
      });
  }
}
