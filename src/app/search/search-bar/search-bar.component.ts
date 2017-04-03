import { Component, OnInit, Output, EventEmitter,
         ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Store } from '@ngrx/store';
import { IgoStore } from '../../store/store';

import { Observer } from '../../utils/observer';

import { SearchResult } from '../shared/search-result.interface';
import { SearchService} from '../shared/search.service';


@Component({
  selector: 'igo-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.styl']
})
export class SearchBarComponent
  extends Observer implements OnInit {
  @Output('key') key = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef;

  term?: string;

  private searchTermsStream = new Subject<string>();
  readonly preValidationSearch = ['Control', 'Shift', 'Alt'];

  constructor(private store: Store<IgoStore>,
              private searchService: SearchService) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.searchTermsStream
        .debounceTime(300)
        .distinctUntilChanged()
        .subscribe((term: string) => {
          if (term) {
            this.searchService.search(term);
            this.focus();
          } else {
            this.searchService.clear();
          }
        }));

    this.subscriptions.push(
      this.store.select(s => s.selectedResult)
        .subscribe((result: SearchResult) => {
          this.blur();
          this.term = result ? result.title : undefined;
        }));
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
      this.search(term);
    }

    this.term = term;
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
