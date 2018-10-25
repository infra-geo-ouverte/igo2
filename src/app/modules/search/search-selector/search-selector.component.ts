import { Component, Input, OnInit } from '@angular/core';

import { Search } from '../shared/search.enum';
import { SearchSourceService } from '../shared/search-source.service';


@Component({
  selector: 'fadq-search-selector',
  templateUrl: './search-selector.component.html',
  styleUrls: ['./search-selector.component.scss']
})
export class SearchSelectorComponent implements OnInit {

  @Input()
  get searches(): Search[] {
    return this._searches;
  }
  set searches(value: Search[]) {
    this._searches = value;
  }
  private _searches: Search[] = Object.values(Search);

  @Input()
  get selected(): Search {
    return this._selected;
  }
  set selected(value: Search) {
    this._selected = value;
  }
  private _selected: Search;

  constructor(private searchSourceService: SearchSourceService) {}

  ngOnInit() {
    const initialSearch = this.selected || this.searches[0];
    this.selectSearchSource(initialSearch);
  }

  selectSearchSource(search: Search) {
    this.selected = search;

    // TODO: This is not supposed to work properly and is for demo purposes only.
    // Search sources should have a type and the search source service
    // should have a method to toggle search sources by type
    const sources = this.searchSourceService.getSources();
    if (search === Search.Client) {
      sources.forEach(source => source.enabled = false);
    } else if (search === Search.DataSource) {
      sources.forEach(source => source.enabled = false);
    } else if (search === Search.Localisation) {
      sources.forEach(source => source.enabled = true);
    }
  }

}
