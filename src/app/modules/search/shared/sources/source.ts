import { Observable } from 'rxjs';

export abstract class SearchSource {

  abstract enabled: boolean;

  abstract getName(): string;

  abstract getType(): string;

  abstract search(term?: string): Observable<any>;
}
