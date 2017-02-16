import { Component, Input } from '@angular/core';

import { SearchResult } from '../shared/search-result.interface';

@Component({
  selector: 'igo-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.styl']
})
export class SearchResultComponent {

  @Input('result') result: SearchResult;

  constructor() { }

}
