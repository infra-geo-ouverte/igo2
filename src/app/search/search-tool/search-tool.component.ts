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
      .subscribe((results: SearchResult[]) => this.results = results);
  }

  selectResult(result: SearchResult) {
    this.store.dispatch({type: 'SELECT_RESULT', payload: result});
  }

  focusResult(result: SearchResult) {
    this.store.dispatch({type: 'FOCUS_RESULT', payload: result});
  }

}

ToolService.register(SearchToolComponent);
