import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, map, skip } from 'rxjs/operators';

import {
  Entity,
  EntityClass,
  EntityFilterClause,
  EntitySortClause,
  State
} from './entity.interfaces';
import { EntityState } from './state';
import { EntityFilter } from './filter';
import { EntitySorter } from './sorter';
import { getEntityId } from './entity.utils';

export class EntityStore<T extends Entity | EntityClass, S extends { [key: string]: boolean } = State> {

  private entities$ = new BehaviorSubject<T[]>([]);
  private filtered$ = new BehaviorSubject<T[]>(this.entities);
  private observable$ = new BehaviorSubject<T[]>(this.filtered);
  private filtered$$: Subscription;
  private observable$$: Subscription;

  get state(): EntityState<S> {
    return this._state;
  }
  private _state: EntityState<S>;

  get filter(): EntityFilter<T> {
    return this._filter;
  }
  private _filter: EntityFilter<T>;

  get sorter(): EntitySorter<T> {
    return this._sorter;
  }
  private _sorter: EntitySorter<T>;

  get rawObservable(): BehaviorSubject<T[]> {
    return this.entities$;
  }

  get filteredObservable(): BehaviorSubject<T[]> {
    return this.filtered$;
  }

  get observable(): BehaviorSubject<T[]> {
    return this.observable$;
  }

  get entities(): T[] {
    return this.entities$.value;
  }

  get filtered(): T[] {
    return this.filtered$.value;
  }

  get empty(): boolean {
    return this.entities.length === 0;
  }

  constructor(state?: EntityState<S>) {
    if (state === undefined) {
      state = new EntityState<S>();
    }
    this._state = state;
    this._filter = new EntityFilter();
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
      this.filter.reset();
      this.sorter.reset();
    }
  }

  addEntities(entities: T[], soft = false) {
    this.setEntities(this.entities.concat(entities), soft);
  }

  putEntities(entities: T[], soft = false) {
    const entitiesIds = entities.map(getEntityId);
    const newEntities = this.entities.slice()
      .filter((entity: Entity) => entitiesIds.indexOf(getEntityId(entity)) < 0)
      .concat(entities);
    this.setEntities(newEntities, soft);
  }

  removeEntities(entities: T[], soft = false) {
    const entitiesIds = entities.map(getEntityId);
    const newEntities = this.entities.slice()
      .filter((entity: Entity) => entitiesIds.indexOf(getEntityId(entity)) < 0);
    this.setEntities(newEntities, soft);
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

  updateEntitiesState(entities: T[], changes: { [key: string]: boolean }, exclusive = false) {
    this.state.updateByKeys(entities.map(getEntityId), changes, exclusive);
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

  observeFirstBy(clause: EntityFilterClause): Observable<T> {
    return this.observable
      .pipe(
        map((entities: T[]) => {
          return entities.find((entity: T) => {
            return clause(entity, this.getEntityState(entity));
          });
        })
      );
  }

  private watchChanges() {
    const filtered$ = combineLatest(
      this.entities$,
      this.filter.observable
    );

    this.filtered$$ = filtered$
      .pipe(
        skip(1),
        debounceTime(50),
        map((results: [T[], EntityFilterClause[]]) => {
          return this.filter.filter(results[0].slice(), (entity: T) => {
            return this.getEntityState(entity);
          });
        })
      ).subscribe((filteredEntities: T[]) => this.filtered$.next(filteredEntities));

    const observable$ = combineLatest(
      this.filtered$,
      this.state.observable,
      this.sorter.observable
    );

    this.observable$$ = observable$
      .pipe(
        skip(1),
        debounceTime(50),
        map((results: [T[], State, EntityFilterClause[]]) => {
          return this.sorter.sort(results[0].slice());
        })
      ).subscribe((entities: T[]) => this.observable$.next(entities));
  }

}
