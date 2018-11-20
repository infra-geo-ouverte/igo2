import { Observable } from 'rxjs';

import { Entity, EntityObject } from '../../entity/shared/entity.interface';
import { SearchSource } from './sources';

export interface Research {
  request: Observable<Entity[]>;
  reverse: boolean;
  source: SearchSource;
}

export interface SearchResult<T = { [key: string]: any }> extends EntityObject {
  data: T;
  source: SearchSource;
}
