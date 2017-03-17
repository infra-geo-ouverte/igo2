import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { ToolComponent } from '../../tool/shared/tool-component';
import { Register } from '../../tool/shared/tool.service';
import { SearchResult } from '../shared/search-result.interface';
import { SearchResultType } from '../shared/search-result.enum';


@Register()
@Component({
  selector: 'igo-search-tool',
  templateUrl: './search-tool.component.html',
  styleUrls: ['./search-tool.component.styl']
})
export class SearchToolComponent
  extends ToolComponent implements OnInit {

  static name_: string = 'search';
  static title: string = 'Search Results';
  static icon: string = 'search';
  static defaultOptions: any = {};

  private sourceResults: [string, SearchResult[]];
  focusedResult?: SearchResult;

  constructor(private store: Store<IgoStore>) {
    super();
  }

  ngOnInit() {
    this.subscriptions.push(
      this.store.select(s => s.focusedResult)
        .subscribe((result: SearchResult) => this.focusedResult = result));

    this.subscriptions.push(
      this.store.select(s => s.searchResults)
        .subscribe((results: SearchResult[]) =>
          this.handleSearchResults(results)));
  }

  selectResult(result: SearchResult) {
    this.store.dispatch({type: 'SELECT_RESULT', payload: result});
  }

  focusResult(result: SearchResult) {
    this.store.dispatch({type: 'FOCUS_RESULT', payload: result});
  }

  private handleSearchResults(results: SearchResult[]) {
    const featureResults = {};
    const layerResults = {};
    results.forEach((result: SearchResult) => {
      const source = result.source;
      let groupedResults = featureResults;
      if (result.type === SearchResultType.Layer) {
          groupedResults = layerResults;
      }
      if (groupedResults[source] === undefined) {
        groupedResults[source] = [];
      }

      groupedResults[source].push(result);
    });

    const sourceResults = [];
    Object.keys(featureResults).sort().forEach((source: string) => {
      sourceResults.push([source, featureResults[source]]);
    });
    Object.keys(layerResults).sort().forEach((source: string) => {
      sourceResults.push([source, layerResults[source]]);
    });

    this.sourceResults = sourceResults as [string, SearchResult[]];
  }
}
