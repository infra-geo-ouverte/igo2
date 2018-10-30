import { DataProvider } from './dataprovider';

export interface Record {
  rid: string;
  meta: RecordMeta;
  data: { [key: string]: any };
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
