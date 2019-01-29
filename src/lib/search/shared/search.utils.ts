import { Feature as IgoFeature } from '@igo2/geo';

import { FEATURE, Feature } from 'src/lib/feature';

import { SearchResult } from './search.interfaces';
import { SearchSource } from './sources';

/**
 * Function that checks whether a search source implements TextSearch
 * @param source Search source
 * @returns True if the search source implements TextSearch
 */
export function sourceCanSearch(source: SearchSource): boolean {
  return (source as any).search !== undefined;
}

/**
 * Function that checks whether a search source implements ReverseSearch
 * @param source Search source
 * @returns True if the search source implements ReverseSearch
 */
export function sourceCanReverseSearch(source: SearchSource): boolean {
  return (source as any).reverseSearch !== undefined;
}

/**
 * Return a search result out of an IgoFeature. This is used to adapt
 * the IGO query module to the new Feature/SearchResult interfaces
 * @param igoFeature IGO feature
 * @param source Search source
 * @returns SearchResult
 */
export function igoFeatureToSearchResult(igoFeature: IgoFeature, source: SearchSource): SearchResult<Feature> {
  return {
    source: source,
    data: {
      type: FEATURE,
      projection: igoFeature.projection,
      geometry: igoFeature.geometry,
      extent: igoFeature.extent,
      properties: igoFeature.properties,
      meta: {
        title: igoFeature.title
      }
    },
    meta: {
      dataType: FEATURE,
      id: igoFeature.id,
      title:  igoFeature.title,
      titleHtml: igoFeature.title_html,
      icon:  igoFeature.icon
    }
  };
}
