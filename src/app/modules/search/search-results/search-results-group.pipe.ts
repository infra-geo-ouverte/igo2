import { Pipe, PipeTransform } from '@angular/core';

import { SearchResult } from '../shared/search.interface';

@Pipe({
  name: 'searchResultsGroup'
})
export class SearchResultsGroupPipe implements PipeTransform {
  transform(value: SearchResult[], args?: any): any {
    const sourceAndResults = {};

    value.forEach((result: SearchResult) => {
      const sourceId = result.source.getId();
      if (sourceAndResults[sourceId] === undefined) {
        sourceAndResults[sourceId] = new Object({
          source: result.source,
          results: []
        });
      }
      sourceAndResults[sourceId].results.push(result);
    });

    return Object.values(sourceAndResults);
  }
}
