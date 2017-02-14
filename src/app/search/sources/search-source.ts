import { Response, URLSearchParams } from '@angular/http';

import { SearchResult } from '../shared/search-result.interface';

export abstract class SearchSource {

  abstract getSearchUrl (): string;

  abstract extractData (response: Response): SearchResult[];

  abstract getSearchParams (term: string): URLSearchParams;

}
