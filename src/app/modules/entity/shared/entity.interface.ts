export interface EntityMeta {
  dataType?: string;
  id?: string | number;
  idProperty?: string;
  title?: string;
  titleProperty?: string;
  titleHtml?: string;
  titleHtmlProperty?: string;
  icon?: string;
  iconProperty?: string;
}

export interface Entity<M = EntityMeta> {
  meta?: M;
}

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
