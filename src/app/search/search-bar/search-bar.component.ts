import { Component, OnInit, Output, EventEmitter,
         ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/debounceTime.js';
import 'rxjs/add/operator/distinctUntilChanged';

import { Tool } from '../../tool/shared/tool.interface';
import { SearchResult } from '../shared/search-result.interface';
import { SearchService} from '../../core/search.service';

import { AppStore } from '../../app.store';

@Component({
  selector: 'igo-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.styl']
})
export class SearchBarComponent implements OnInit {
  searchTool: Tool;
  @Output('key') key = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;

  term?: string;

  private searchTermsStream = new Subject<string>();

  constructor(private store: Store<AppStore>,
              private searchService: SearchService) {}

  ngOnInit(): void {
    this.store
      .select(s => s.availableTools)
      .subscribe((tools: Tool[]) => {
          this.searchTool = tools.find(t => t.name === 'search');
       });

    this.searchTermsStream
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe((term: string) => this.searchService.search(term));

    this.store
      .select(s => s.selectedResult)
      .subscribe((result: SearchResult) => {
        this.term = result ? result.title : undefined;
      });
  }

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
    this.store.dispatch({type: 'SELECT_TOOL', payload: this.searchTool});
  }

  search(term: string): void {
    this.searchTermsStream.next(term);
  }

  focus() {
    this.input.nativeElement.focus();
  }
}
