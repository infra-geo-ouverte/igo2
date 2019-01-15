import { Pipe, PipeTransform } from '@angular/core';

import { SearchResult } from '../shared/search.interfaces';
import { SearchSource } from '../shared/sources/source';

/**
 * This pipe returns a source -> results mapper.
 */
@Pipe({
  name: 'searchResultsGroup'
})
export class SearchResultsGroupPipe implements PipeTransform {
  transform(value: SearchResult[], args?: any): Map<SearchSource, SearchResult[]> {
   const grouped = new Map<SearchSource, SearchResult[]>();

   value.forEach((result: SearchResult) => {
     const source = result.source;
     let sourceResults = grouped.get(source);
     if (sourceResults === undefined) {
       sourceResults = [];
       grouped.set(source, sourceResults);
     }
     sourceResults.push(result);
   });
   return grouped;
  }
}
