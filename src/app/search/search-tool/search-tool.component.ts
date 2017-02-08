import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ToolComponent } from '../../tool/shared/tool-component.model';
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

  constructor(private store: Store<AppStore>) { }

  ngOnInit() {
    this.store
      .select(s => s.searchResults)
      .subscribe(state => {
        this.results = state ? state.results : [];
      });
  }

  selectResult(result: SearchResult) {
    this.store.dispatch({type: 'SELECT_RESULT', payload: result});
  }

}

ToolService.register(SearchToolComponent);
