import { Component } from '@angular/core';

import { Search } from '../shared/search.enum';


@Component({
  selector: 'fadq-search-selector',
  templateUrl: './search-selector.component.html',
  styleUrls: ['./search-selector.component.scss']
})
export class SearchSelectorComponent {

  searches() : Array<string> {
    return Object.keys(Search);
  }

  constructor() {}

}
