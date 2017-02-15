import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ToolComponent } from '../../tool/shared/tool-component';
import { ToolService } from '../../core/tool.service';
import { SearchResult } from '../shared/search-result.interface';

import { AppStore } from '../../app.store';


@Component({
  selector: 'igo-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrls: ['./search-tool.component.styl']
})
export class SearchToolComponent implements ToolComponent, OnInit {

  static name_: string = 'search';
  static title: string = 'Search Results';
  static icon: string = 'search';
  static defaultOptions: any = {};

  private results: SearchResult[];
  focusedResult?: SearchResult;

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.store.select(s => s.focusedResult)
      .subscribe((result: SearchResult) => this.focusedResult = result);

    this.store
      .select(s => s.searchResults)
      .subscribe((results: SearchResult[]) =>
        this.handleSearchResults(results));
  }

  selectResult(result: SearchResult) {
    this.store.dispatch({type: 'SELECT_RESULT', payload: result});
  }

  focusResult(result: SearchResult) {
    this.store.dispatch({type: 'FOCUS_RESULT', payload: result});
  }

  private handleSearchResults(results: SearchResult[]) {
    const results_ = results.map((result, index) => {
      return {index: index, data: result};
    });

    results_.sort((r1, r2) => {
      if (r1.data.source < r2.data.source) {
        return -1;
      }

      if (r1.data.source > r2.data.source) {
        return 1;
      }

      return r1.index - r2.index;
    });

    this.results = results_.map(result_ => result_.data);
  }

}

ToolService.register(SearchToolComponent);
