import { Observable } from 'rxjs';

import { SearchResult } from '../search.interfaces';
import { SearchSourceOptions } from './source.interfaces';

/**
 * Base search source class
 */
export class SearchSource {

  /**
   * Search source ID
   * @internal
   */
  static id: string;

  /**
   * Search source type
   * @internal
   */
  static type: string;

  /**
   * Search source options
   * @internal
   */
  protected options: SearchSourceOptions;

  /**
   * Get search source's id
   * @returns Search source's id
   */
  protected getId(): string {
    throw new Error('You have to implement the method "getId".');
  }

  /**
   * Get search source's default options
   * @returns Search source default options
   */
  protected getDefaultOptions(): SearchSourceOptions {
    throw new Error('You have to implement the method "getDefaultOptions".');
  }

  /**
   * Search source's title
   */
  get title(): string { return this.options.title; }

  /**
   * Whether the search source is available
   */
  set available(value: boolean) { this.options.available = value; }
  get available(): boolean { return this.options.available !== false; }

  /**
   * Whether the search source is enabled
   */
  set enabled(value: boolean) { this.options.enabled = value; }
  get enabled(): boolean { return this.available && this.options.enabled !== false; }

  /**
   * Search url
   */
  get searchUrl(): string { return this.options.searchUrl; }

  /**
   * Search query params
   */
  get params(): { [key: string]: string } {
    return this.options.params === undefined ? {} : this.options.params;
  }

  /**
   * Search results display order
   */
  get displayOrder(): number {
    return this.options.order === undefined ? 99 : this.options.order;
  }

  constructor(options: SearchSourceOptions) {
    this.options = Object.assign(this.getDefaultOptions(), options);
  }

}

/**
 * Search sources that allow searching by text implement this class
 */
export interface TextSearch {

  /**
   * Search by text
   * @param term Text
   * @returns Observable or search results
   */
  search(term: string): Observable<SearchResult[]>;
}

/**
 * Search sources that allow searching by coordinates implement this class
 */
export interface ReverseSearch {

  /**
   * Search by text
   * @param lonLat Coordinates
   * @param distance Optional: Search radius arounf lonLat
   * @returns Observable or search results
   */
  reverseSearch(lonLat: [number, number], distance?: number): Observable<SearchResult[]>;
}
