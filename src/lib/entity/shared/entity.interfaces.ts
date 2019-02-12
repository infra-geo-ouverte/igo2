import { Observable } from 'rxjs';

import {
  EntityOperationType,
  EntityTableColumnRenderer
} from './entity.enums';
import { EntityStore } from './store';

export type EntityKey = string | number;

export interface EntityState {
  [key: string]: any;
}

export interface EntityRecord<E extends object, S extends EntityState = EntityState> {
  entity: E;
  state: S;
}

export interface EntityStoreOptions {
  getKey?: (entity: object) => EntityKey;
  getProperty?: (entity: object, property: string) => any;
}

export interface EntityStateManagerOptions {
  getKey?: (entity: object) => EntityKey;
}

export interface EntityTransactionOptions {
  getKey?: (entity: object) => EntityKey;
}

export type EntityFilterClause<E = object> = (entity: E) => boolean;

export interface EntitySortClause<E = object> {
  valueAccessor: (entity: E) => string | number;
  direction: string;
}

export interface EntityJoinClause {
  source: Observable<any | void>;
  reduce: (object, any) => object;
}

export interface EntityOperation {
  key: EntityKey;
  type: EntityOperationType;
  previous: object | undefined;
  current: object | undefined;
  store?: EntityStore<object>;
  meta?: {[key: string]: any};
}

export interface EntityOperationState {
  added: boolean;
  canceled: boolean;
}

export interface EntityTableTemplate {
  columns: EntityTableColumn[];
  selection?: boolean;
  sort?: boolean;
  valueAccessor?: (entity: object, property: string) => any;
  rowClassFunc?: (entity: object) => {
    [key: string]: boolean;
  };
  cellClassFunc?: (entity: object, column: EntityTableColumn) => {
    [key: string]: boolean;
  };
}

export interface EntityTableColumn {
  name: string;
  title: string;
  renderer?: EntityTableColumnRenderer;
  valueAccessor?: (entity: object) => any;
  visible?: boolean;
  sort?: boolean;
  filterable?: boolean;
  cellClassFunc?: (entity: object) => {
    [key: string]: boolean;
  };
}
