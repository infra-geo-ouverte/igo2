import { EntityProvider } from './provider';

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

export interface Entity<T = { [key: string]: any }, M = EntityMeta> {
  rid: string;
  meta: M;
  data: T;
  provider?: EntityProvider;
}

export interface State {
  [key: string]: boolean;
}
