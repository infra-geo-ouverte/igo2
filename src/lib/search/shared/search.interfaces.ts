import { Observable } from 'rxjs';

import { SearchSource } from './sources';

export interface Research {
  request: Observable<SearchResult[]>;
  reverse: boolean;
  source: SearchSource;
}

export interface SearchResult<T = { [key: string]: any }> {
  data: T;
  source: SearchSource;
  meta: {
    dataType: string;
    id: string;
    title: string;
    titleHtml?: string;
    icon: string;
  };
}
