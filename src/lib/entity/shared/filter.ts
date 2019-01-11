import { BehaviorSubject } from 'rxjs';

import { Entity, EntityFilterClause, State } from './entity.interfaces';
import { filterEntities } from './entity.utils';

/**
 * This class is used to filter a store's entities
 */
export class EntityFilter<T extends Entity> {

  /**
   * Observable of filter clauses
   */
  clauses$ = new BehaviorSubject<EntityFilterClause[]>([]);

  /**
   * Current filter clauses
   */
  get clauses(): EntityFilterClause[] {
    return this.clauses$.value;
  }

  constructor() {}

  /**
   * Add a filter clause
   * @param clause Filter clause
   */
  add(clause: EntityFilterClause) {
    this.set(this.clauses.concat([clause]));
  }

  /**
   * Set all filter clauses
   * @param clauses Filter clauses
   */
  set(clauses: EntityFilterClause[]) {
    this.clauses$.next(clauses);
  }

  /**
   * Reset filter clauses
   */
  reset() {
    if (this.clauses.length > 0) {
      this.set([]);
    }
  }

  /**
   * Apply filter clauses to a list of entities and return the filtered
   * entities
   * @param entities Entities
   * @param stateGetter Method to retrieve an entity's state
   * @returns A new filtered array of entities
   */
  filter(entities: T[], stateGetter: (entity: T) => State): T[] {
    if (this.clauses.length === 0) {
      return entities;
    }
    return filterEntities(entities, this.clauses, stateGetter) as T[];
  }
}
