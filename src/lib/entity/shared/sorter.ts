import { BehaviorSubject } from 'rxjs';

import { Entity, EntitySortClause } from './entity.interfaces';
import { sortEntities } from './entity.utils';

/**
 * This class is used to sort a store's entities
 */
export class EntitySorter<T extends Entity> {

  /**
   * Observable of the sort clause
   */
  clause$ = new BehaviorSubject<EntitySortClause | undefined>(undefined);

  /**
   * Current sort clause
   */
  get clause(): EntitySortClause | undefined {
    return this.clause$.value;
  }

  constructor() {}

  /**
   * Set sort clause
   * @param clause Sort clause
   */
  set(clause: EntitySortClause) {
    this.clause$.next(clause);
  }

  /**
   * Reset the sort clause
   */
  reset() {
    if (this.clause !== undefined) {
      this.set(undefined);
    }
  }

  /**
   * Apply the sort clause to a list of entities and return the sorted
   * entities
   * @param entities Entities
   * @returns A new sorted array of entities
   */
  sort(entities: T[]): T[] {
    if (this.clause === undefined) {
      return entities;
    }

    return sortEntities(
      entities,
      this.clause.property,
      this.clause.direction
    ) as T[];
  }
}
