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

export interface EntityTableModel {
  columns: EntityTableColumn[];
  selection: boolean;
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
  sortable?: boolean;
  filterable?: boolean;
}

export interface EntitySortClause {
  property: string;
  direction: string;
}

export interface EntityFormModel {
  fields: EntityFormField[];
  submitLabel?: string;
  cancelLabel?: string;
}

export interface EntityFormField {
  name: string;
  title: string;
  visible?: boolean;
  cols?: number;
}
