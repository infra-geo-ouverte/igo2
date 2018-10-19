import { Observable } from 'rxjs';
import { SearchSource } from '@igo2/geo';

export interface SearchResult {
  data: any;
  source: SearchSource;
}

export interface Research {
  request: Observable<any>;
  source: SearchSource;
}
