import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime.js';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

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

  private searchTermsStream = new Subject<string>();

  constructor(private store: Store<AppStore>,
              private searchService: SearchService) {}

  onKey(event: KeyboardEvent) {
    const term = (<HTMLInputElement>event.target).value;
    this.key.emit(term);

    this.selectSearchTool();
    this.search(term);
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
      .subscribe(term =>
        this.searchService.search(term));
  }
}
