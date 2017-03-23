import { Observable } from 'rxjs/Observable';

import { Message } from '../../core/message';
import { SearchResult } from '../shared/search-result.interface';

export abstract class SearchSource {

  abstract getName(): string;

  abstract search(term?: string): Observable<SearchResult[] | Message[]>

}
