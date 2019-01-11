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

/**
 * An entity store class holds the references to any number of entities
 * as well as their state. It can be observed, filtered and sorted and
 * provides methods to add, update or remove entities.
 */
export class EntityStore<T extends Entity | EntityClass, S extends { [key: string]: boolean } = State> {

  /**
   * Observable of the raw entities
   */
  rawEntities$ = new BehaviorSubject<T[]>([]);

  /**
   * Observable of the filtered entities
   */
  filteredEntities$ = new BehaviorSubject<T[]>(this.rawEntities);

  /**
   * Observable of the filtered and sorted entities as well as any
   * state change
   */
  entities$ = new BehaviorSubject<T[]>(this.filteredEntities);

  /**
   * Entity store state
   */
  state: EntityState<S> = new EntityState();

  /**
   * Entity store filter
   */
  filter: EntityFilter<T> = new EntityFilter();

  /**
   * Entity store sorter
   */
  sorter: EntitySorter<T> = new EntitySorter();

  /**
   * Subscription to the filtered entities
   */
  private filteredEntities$$: Subscription;

  /**
   * Subscription to any change
   */
  private entities$$: Subscription;

  /**
   * Raw entities
   */
  get rawEntities(): T[] {
    return this.rawEntities$.value;
  }

  /**
   * Filtered entities
   */
  get filteredEntities(): T[] {
    return this.filteredEntities$.value;
  }

  /**
   * Filtered and sorted entities
   */
  get entities(): T[] {
    return this.entities$.value;
  }

  /**
   * Whether this store contais  entities (after filters)
   */
  get filteredEmpty(): boolean {
    return this.filteredEntities.length === 0;
  }

  constructor(state?: EntityState<S>) {
    if (state !== undefined) {
      this.state = state;
    }
    this.watchChanges();
  }

  /**
   * Unsubscribe to any change and clear this store
   */
  destroy() {
    this.unwatchChanges();
    this.clear();
  }

  /**
   * Clear data
   */
  clear(soft = false) {
    this.setEntities([], soft);
  }

  /**
   * Set this store's entities.
   * @param entities Entities
   * @param soft If true, the current state won't be cleared
   */
  setEntities(entities: T[], soft: boolean = false) {
    this.rawEntities$.next(entities);
    if (soft === false) {
      this.state.reset();
      this.filter.reset();
      this.sorter.reset();
    }
  }

  /**
   * Add entities to to store (prepend)
   * @param entities Entities
   */
  addEntities(entities: T[]) {
    this.setEntities(entities.concat(this.rawEntities), true);
  }

  /**
   * Append entities to to store
   * @param entities Entities
   */
  appendEntities(entities: T[]) {
    this.setEntities(this.rawEntities.concat(entities), true);
  }

  /**
   * Add entities to store and update existing ones
   * @param entities Entities
   */
  putEntities(entities: T[]) {
    const entitiesMap = new Map();
    entities.forEach((entity: T) => {
      entitiesMap.set(getEntityId(entity), entity);
    });

    const existingEntities = [];
    this.rawEntities.forEach((entity: T) => {
      const entityId = getEntityId(entity);
      const newEntity = entitiesMap.get(entityId);
      if (newEntity === undefined) {
        existingEntities.push(entity);
      } else {
        existingEntities.push(newEntity);
        entitiesMap.delete(entityId);
      }
    });

    const newEntities = Array.from(entitiesMap.values()).concat(existingEntities);
    this.setEntities(newEntities, true);
  }

  /**
   * Remove entities from store
   * @param entities Entities
   */
  removeEntities(entities: T[]) {
    const entitiesIds = entities.map(getEntityId);
    const newEntities = this.rawEntities.slice()
      .filter((entity: Entity) => entitiesIds.indexOf(getEntityId(entity)) < 0);
    // this.setEntitiesState(entities, {} as S);
    this.setEntities(newEntities, true);
  }

  /**
   * Get an entity from the store by id
   * @param id Entity id
   * @returns Entity
   */
  getEntityById(id: string): T {
    return this.rawEntities.find((entity: T) => getEntityId(entity) === id);
  }

  /**
   * Get the state of an entity
   * @param entity Entity
   * @returns State
   */
  getEntityState(entity: T): S {
    return this.state.getByKey(getEntityId(entity)) || {} as S;
  }

  /**
   * Set the state of an entity
   * @param entity Entity
   * @param State
   */
  setEntityState(entity: T, state: S) {
    this.setEntitiesState([entity], state);
  }

  /**
   * Set the state of multiple entities
   * @param entities Entities
   * @param State
   */
  setEntitiesState(entities: T[], state: S) {
    this.state.setByKeys(entities.map(getEntityId), state);
  }

  /**
   * Update the state of an entity
   * @param entity Entity
   * @param changes State changes
   * @param exclusive Whether this key should be the only one in that state
   */
  updateEntityState(entity: T, changes: { [key: string]: boolean }, exclusive = false) {
    this.state.updateByKey(getEntityId(entity), changes, exclusive);
  }

  /**
   * Update the state of multiple entities
   * @param entities Entities
   * @param changes State changes
   * @param exclusive Whether these keys should be the only one in that state
   */
  updateEntitiesState(entities: T[], changes: { [key: string]: boolean }, exclusive = false) {
    this.state.updateByKeys(entities.map(getEntityId), changes, exclusive);
  }

  /**
   * Update the state of all entities
   * @param changes State changes
   */
  updateAllEntitiesState(changes: { [key: string]: boolean }) {
    this.state.updateAll(changes);
  }

  /**
   * Create a custom observable of filtered entities
   * @param filterBy Filter function that receives an entity and it's state
   * @param Observable of the filtered entities
   */
  observeBy(filterBy: (entity: T, state: S) => boolean): Observable<T[]> {
    return this.entities$
      .pipe(
        map((entities: T[]) => {
          return entities.filter((entity: T) => {
            return filterBy(entity, this.getEntityState(entity));
          });
        })
      );
  }

  /**
   * Create a custom observable of the first entity returned by the filter
   * function
   * @param filterBy Filter function that receives an entity and it's state
   * @param Observable of the first filtered entity
   */
  observeFirstBy(filterBy: (entity: T, state: S) => boolean): Observable<T> {
    return this.entities$
      .pipe(
        map((entities: T[]) => {
          return entities.find((entity: T) => {
            return filterBy(entity, this.getEntityState(entity));
          });
        })
      );
  }

  /**
   * Start watching changes in the entities, filter, sorter and state and update
   * this store's observables accordingly.
   */
  private watchChanges() {
    const filteredEntities$ = combineLatest(
      this.rawEntities$,
      this.filter.clauses$
    );

    this.filteredEntities$$ = filteredEntities$
      .pipe(
        skip(1),
        debounceTime(50),
        map((results: [T[], EntityFilterClause[]]) => {
          return this.filter.filter(results[0].slice(), (entity: T) => {
            return this.getEntityState(entity);
          });
        })
      ).subscribe((filteredEntities: T[]) => {
        this.filteredEntities$.next(filteredEntities);
      });

    const entities$ = combineLatest(
      this.filteredEntities$,
      this.state.states$,
      this.sorter.clause$
    );

    this.entities$$ = entities$
      .pipe(
        skip(1),
        debounceTime(50),
        map((results: [T[], State, EntityFilterClause[]]) => {
          return this.sorter.sort(results[0].slice());
        })
      ).subscribe((entities: T[]) => this.entities$.next(entities));
  }

  /**
   * Stop watching for changes
   */
  private unwatchChanges() {
    if (this.filteredEntities$$ !== undefined) {
      this.filteredEntities$$.unsubscribe();
    }
    if (this.entities$$ !== undefined) {
      this.entities$$.unsubscribe();
    }
  }

}
