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
  @Output('key') key = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;
  term?: string;
  private searchTool: Tool;
  private searchTermsStream = new Subject<string>();
  readonly preValidationSearch = ['Control', 'Shift', 'Alt'];

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
      .subscribe((term: string) => {
        if (term) {
          this.searchService.search(term);
          this.input.nativeElement.focus();
        } else {
          this.searchService.clear();
        }
      });

    this.store
      .select(s => s.selectedResult)
      .subscribe((result: SearchResult) => {
        this.blur();
        this.term = result ? result.title : undefined;
      });
  }

  keyup(event: KeyboardEvent) {
    const term = (<HTMLInputElement>event.target).value;

    // Prevent searching the same thing twice
    // and searching when clicking "enter" on a search result
    if (
        (term !== this.term)
        && (term.length >= 3)
        && (this.preValidationSearch.find(value => value === event.key) === undefined)
    ) {
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

  clear() {
    this.searchService.clear();
    this.term = undefined;

    // This is required to allow doing the exact same search
    // which wouldn't be possible if the term in the stream
    // didn't change
    this.searchTermsStream.next(this.term);
  }

  blur() {
    this.input.nativeElement.blur();
  }

  focus() {
    this.input.nativeElement.focus();
  }
}
