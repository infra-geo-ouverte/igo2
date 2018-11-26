import { Component, Input, OnInit } from '@angular/core';

import { SEARCHES } from '../shared/search.enum';
import { SearchSourceService } from '../shared/search-source.service';


@Component({
  selector: 'fadq-search-selector',
  templateUrl: './search-selector.component.html',
  styleUrls: ['./search-selector.component.scss']
})
export class SearchSelectorComponent implements OnInit {

  @Input()
  get searches(): string[][] {
    return this._searches;
  }
  set searches(value: string[][]) {
    this._searches = value;
  }
  private _searches: string[][] = SEARCHES;

  @Input()
  get enabled(): string {
    return this._enabled;
  }
  set enabled(value: string) {
    this._enabled = value;
  }
  private _enabled: string;

  constructor(private searchSourceService: SearchSourceService) {}

  ngOnInit() {
    const initial = this.enabled || this.searches[0][1];
    this.enableSearchType(initial);
  }

  onSearchTypeChanged(type: string) {
    this.enableSearchType(type);
  }

  private enableSearchType(type: string) {
    this.enabled = type;
    this.searchSourceService.enableSourcesByType(type);
  }

}
