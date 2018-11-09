import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { Entity, State } from './entity.interface';
import { EntityState } from './state';

export class EntityStore<T extends Entity, S extends { [key: string]: boolean } = State> {

  private entities$ = new BehaviorSubject<T[]>([]);
  private state$$: Subscription;

  get state(): EntityState<S> {
    return this._state;
  }
  set state(value: EntityState<S>) {
    this._state = value;
  }
  _state: EntityState<S>;

  get observable(): BehaviorSubject<T[]> {
    return this.entities$;
  }

  get entities(): T[] {
    return this.entities$.value;
  }

  get empty(): boolean {
    return this.entities.length === 0;
  }

  constructor(state?: EntityState<S>) {
    if (state === undefined) {
      state = new EntityState<S>();
    }
    this.state = state;
  }

  destroy() {
    this.state$$.unsubscribe();
  }

  clear(soft = false) {
    this.setEntities([], soft);
  }

  setEntities(entities: T[], soft = false) {
    this.entities$.next(entities);
    if (soft === false) {
      this.state.reset();
    }
  }

  addEntities(entities: T[], soft = false) {
    this.setEntities(this.entities.concat(entities), soft);
  }

  getEntityByRid(rid: string): T {
    return this.entities.find((entity: T) => entity.rid === rid);
  }

  getEntityState(entity: T): S {
    return this.state.getByKey(entity.rid) || {} as S;
  }

  updateEntityState(entity: T, changes: { [key: string]: boolean }, exclusive = false) {
    this.state.updateByKey(entity.rid, changes, exclusive);
  }

  updateAllEntitiesState(changes: { [key: string]: boolean }) {
    this.state.updateAll(changes);
  }

  observeBy(filterBy: (entity: T, state: S) => boolean): Observable<T[]> {
    return combineLatest(this.observable, this.state.observable)
      .pipe(
        debounceTime(50),
        map((value: [T[], S]) => {
          const entities = value[0];
          return entities.filter((entity: T) => {
            return filterBy(entity, this.getEntityState(entity));
          });
        })
      );
  }
}
