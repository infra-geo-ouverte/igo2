import { DataProvider } from './dataprovider';

export interface RecordMeta {
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

export interface Record<T = { [key: string]: any }, M = RecordMeta> {
  rid: string;
  meta: M;
  data: T;
  provider?: DataProvider;
}

export interface RecordState {
  focused: boolean;
  selected: boolean;
}
