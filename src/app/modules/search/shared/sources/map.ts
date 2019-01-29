import { Injectable, Inject } from '@angular/core';

import { FEATURE } from 'src/lib/feature';
import {
  SearchSource,
  SearchSourceOptions
} from 'src/lib/search';

/**
 * Map search source. For now it has no search capability. All it does
 * is act as a placeholder for the map query results' "search source".
 */
@Injectable()
export class MapSearchSource extends SearchSource {

  static id = 'map';
  static type = FEATURE;

  constructor(@Inject('options') options: SearchSourceOptions) {
    super(options);
  }

  protected getId(): string { return MapSearchSource.id; }

  protected getDefaultOptions(): SearchSourceOptions {
    return {
      title: 'Carte'
    };
  }

}
