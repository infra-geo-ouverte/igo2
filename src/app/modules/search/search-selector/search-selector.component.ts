import { Component, Input, OnInit } from '@angular/core';

import { Search } from '../shared/search.enum';
import { SearchSourceService } from '@igo2/geo';


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
    this.toggleSearchSource(this._selected);
  }
  private _selected: Search;

  constructor(private searchSourceService: SearchSourceService) {}

  ngOnInit() {
    if (this.selected === undefined) {
      this.select(this.searches[0]);
    }
  }

  select(search: Search) {
    this.selected = search;
  }

  toggleSearchSource(search: Search) {
    // TODO: This is not supposed to work properly and is for demo purposes only.
    // Search sources should have a type and the search source service
    // should have a method to toggle search sources by type
    const sources = this.searchSourceService.sources;
    if (search === Search.Client) {
      sources.forEach(source => source.enabled = false);
    } else if (search === Search.DataSource) {
      sources.forEach(source => source.enabled = false);
    } else if (search === Search.Localisation) {
      sources.forEach(source => source.enabled = true);
    }
  }

}
