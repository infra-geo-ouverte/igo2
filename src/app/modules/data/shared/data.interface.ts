import { DataProvider } from './dataprovider';

export interface Record<T = { [key: string]: any }> {
  rid: string;
  meta: RecordMeta;
  data: T;
  provider?: DataProvider;
}

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

export interface RecordState {
  focused: boolean;
  selected: boolean;
}
