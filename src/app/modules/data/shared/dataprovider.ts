import { Observable } from 'rxjs';

import { Record } from './data.interface';


export abstract class DataProvider {

  abstract getId(): string;

}

export abstract class SearchableDataProvider {

  abstract search(term?: string): Observable<Record[]>;

}
