import { ValidatorFn } from '@angular/forms';

export interface EntityMeta {
  dataType?: string;
  id?: string;
  idProperty?: string;
  title?: string;
  titleProperty?: string;
  titleHtml?: string;
  titleHtmlProperty?: string;
  icon?: string;
  iconProperty?: string;
}

export interface EntityObject<M = EntityMeta> {
  meta?: M;
}

export abstract class EntityClass<M = EntityMeta> implements EntityObject {
  meta?: M;
}

export type Entity = EntityObject | EntityClass;

export interface State {
  [key: string]: boolean;
}

export interface EntityTableTemplate {
  columns: EntityTableColumn[];
  selection?: boolean;
  sort?: boolean;
  rowClassFunc?: (entity: Entity) => {
    [key: string]: boolean;
  };
  cellClassFunc?: (entity: Entity, column: EntityTableColumn) => {
    [key: string]: boolean;
  };
}

export interface EntityTableColumn {
  name: string;
  title: string;
  visible?: boolean;
  html?: boolean;
  sort?: boolean;
  filterable?: boolean;
}

export interface EntitySortClause {
  property: string;
  direction: string;
}

export type EntityFilterClause = (entity: Entity, state: State) => boolean;

export interface EntityFormTemplate {
  fields: EntityFormField[];
  submitLabel?: string;
  cancelLabel?: string;
}

export interface EntityFormFieldOptions {
  validator?: ValidatorFn;
  disabled?: boolean;
  visible?: boolean;
  cols?: number;
}

export interface EntityFormField extends EntityFormFieldOptions {
  name: string;
  title: string;
}
