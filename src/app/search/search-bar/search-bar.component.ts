import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime.js';
import 'rxjs/add/operator/distinctUntilChanged';

import { Tool } from '../../tool/shared/tool.interface';
import { SearchService} from '../../core/search.service';

import { AppStore } from '../../app.store';

@Component({
  selector: 'igo-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.styl']
})
export class SearchBarComponent implements OnInit {
  @Input('tool') tool: Tool;
  @Output('key') key = new EventEmitter<string>();

  term?: string;

  private searchTermsStream = new Subject<string>();

  constructor(private store: Store<AppStore>,
              private searchService: SearchService) {}

  keyup(event: KeyboardEvent) {
    const term = (<HTMLInputElement>event.target).value;

    // Prevent searching the same thing twice
    // and searching when clicking "enter" on a search result
    if (term !== this.term) {
      this.key.emit(term);
      this.selectSearchTool();
      this.search(term);
    }

    this.term = term;
  }

  selectSearchTool() {
    this.store.dispatch({type: 'SELECT_TOOL', payload: this.tool});
  }

  search(term: string): void {
    this.searchTermsStream.next(term);
  }

  ngOnInit(): void {
    this.searchTermsStream
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => this.searchService.search(term));

    this.store
      .select(s => s.selectedResult)
      .subscribe(state => {
        this.term = state ? state.title : undefined;
      });
  }
}
