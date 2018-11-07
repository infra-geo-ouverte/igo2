import { Observable } from 'rxjs';

import { DataProvider } from '../../../data/shared/provider';
import { Record } from '../../../data/shared/data.interface';
import { SearchSourceOptions } from './source.interface';

export class SearchSource implements DataProvider {

  static id: string;

  protected options: SearchSourceOptions;

  getId(): string {
    throw new Error('You have to implement the method "getId".');
  }

  getDefaultOptions(): SearchSourceOptions {
    throw new Error('You have to implement the method "getDefaultOptions".');
  }

  get title(): string {
    return this.options.title;
  }

  get enabled(): boolean {
    return this.options.enabled !== false;
  }
  set enabled(value: boolean) {
    this.options.enabled = value;
  }

  get searchUrl(): string {
    return this.options.searchUrl;
  }

  get params(): { [key: string]: string } {
    return this.options.params === undefined ? {} : this.options.params;
  }

  get displayOrder(): number {
    return this.options.order === undefined ? 99 : this.options.order;
  }

  protected initOptions(options: SearchSourceOptions) {
    this.options = Object.assign(this.getDefaultOptions(), options);
  }

}


export interface TextSearch {

  search(term: string): Observable<Record[]>;

}


export interface ReverseSearch {

  reverseSearch(lonLat: [number, number], distance?: number): Observable<Record[]>;

}
