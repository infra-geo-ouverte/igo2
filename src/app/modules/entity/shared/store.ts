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
  private watcher$$: Subscription;

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

  updateEntitiesState(entities: T[], changes: { [key: string]: boolean }) {
    this.state.updateByKeys(entities.map(getEntityId), changes);
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
    const combined$ = combineLatest(
      this.entities$,
      this.state.observable,
      this.filter.observable,
      this.sorter.observable
    );

    this.watcher$$ = combined$
      .pipe(
        skip(1),
        debounceTime(50),
      ).subscribe((value: [T[], Map<string, S>, EntityFilterClause[],  EntitySortClause]) => {
        let entities = value[0].slice();
        entities = this.filter.filter(entities, (entity: T) => {
          return this.getEntityState(entity);
        });
        entities = this.sorter.sort(entities);
        this.observable.next(entities);
      });
  }
}
