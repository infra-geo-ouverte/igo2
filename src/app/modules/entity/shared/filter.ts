import { BehaviorSubject } from 'rxjs';

import { Entity, EntityFilterClause, State } from './entity.interfaces';
import { filterEntities } from './entity.utils';

export class EntityFilter<T extends Entity> {

  public clauses$ = new BehaviorSubject<EntityFilterClause[]>([]);

  get observable(): BehaviorSubject<EntityFilterClause[]> {
    return this.clauses$;
  }

  get clauses(): EntityFilterClause[] {
    return this.clauses$.value;
  }

  constructor() {}

  add(clause: EntityFilterClause) {
    this.set(this.clauses.concat([clause]));
  }

  set(clauses: EntityFilterClause[]) {
    this.clauses$.next(clauses);
  }

  reset() {
    if (this.clauses.length > 0) {
      this.set([]);
    }
  }

  filter(entities: T[], stateGetter: (entity: T) => State): T[] {
    if (this.clauses.length === 0) {
      return entities;
    }
    return filterEntities(entities, this.clauses, stateGetter) as T[];
  }
}
