import { Component, Input } from '@angular/core';

import { SearchResult } from '../shared/search-result.interface';

@Component({
  selector: 'igo-search-result-details',
  templateUrl: './search-result-details.component.html',
  styleUrls: ['./search-result-details.component.styl']
})
export class SearchResultDetailsComponent {

  @Input('result') result: SearchResult;

  constructor() { }

}
