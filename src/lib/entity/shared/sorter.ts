import { BehaviorSubject } from 'rxjs';

import { Entity, EntitySortClause } from './entity.interfaces';
import { sortEntities } from './entity.utils';

export class EntitySorter<T extends Entity> {

  public clause$ = new BehaviorSubject<EntitySortClause | undefined>(undefined);

  get observable(): BehaviorSubject<EntitySortClause | undefined> {
    return this.clause$;
  }

  get clause(): EntitySortClause | undefined {
    return this.clause$.value;
  }

  constructor() {}

  set(clause: EntitySortClause) {
    this.clause$.next(clause);
  }

  reset() {
    if (this.clause !== undefined) {
      this.set(undefined);
    }
  }

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
