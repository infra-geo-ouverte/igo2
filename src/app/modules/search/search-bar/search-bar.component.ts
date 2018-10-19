import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';

import { FloatLabelType } from '@angular/material';

import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SearchService } from '../shared/search.service';
import { SearchResult } from '../shared/search.interface';

@Component({
  selector: 'fadq-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Input()
  get term() {
    return this._term;
  }
  set term(value: string) {
    this._term = value;
  }
  private _term = '';

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
  }
  private _placeholder = '';

  @Input()
  get floatLabel() {
    return this._floatLabel;
  }
  set floatLabel(value: FloatLabelType) {
    this._floatLabel = value;
  }
  private _floatLabel: FloatLabelType = 'auto';

  @Input()
  get disabled() {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled = false;

  @Input()
  get color() {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }
  private _color = 'primary';

  @Input()
  get debounce() {
    return this._debounce;
  }
  set debounce(value: number) {
    this._debounce = value;
  }
  private _debounce = 300;

  @Input()
  get minLength() {
    return this._minLength;
  }
  set minLength(value: number) {
    this._minLength = value;
  }
  private _minLength = 2;

  @Input()
  get searchIcon() {
    return this._searchIcon;
  }
  set searchIcon(value: string) {
    this._searchIcon = value;
  }
  private _searchIcon;

  private readonly invalidKeys = ['Control', 'Shift', 'Alt'];
  private stream$ = new Subject<string>();
  private stream$$: Subscription;

  @Output() change = new EventEmitter<string>();
  @Output() search = new EventEmitter<SearchResult>();

  @ViewChild('input') input: ElementRef;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.stream$$ = this.stream$
      .pipe(
        debounceTime(this._debounce),
        distinctUntilChanged()
      )
      .subscribe((term: string) => this.handleTermChanged(term));
  }

  ngOnDestroy() {
    this.stream$$.unsubscribe();
  }

  keyup(event: KeyboardEvent) {
    const key = (event.target as HTMLInputElement).value;
    if (!this.keyIsValid(key)) {
      return;
    }
    this.setTerm(key);
  }

  setTerm(term: string) {
    if (this.disabled) {
      return;
    }

    this.term = term;
    if (term.length >= this.minLength || term.length === 0) {
      this.stream$.next(term);
    }
  }

  clear() {
    this.term = '';
    this.stream$.next(this.term);
    this.input.nativeElement.focus();
  }

  private keyIsValid(key: string) {
    return this.invalidKeys.indexOf(key) === -1;
  }

  private handleTermChanged(term: string | undefined) {
    if (term === undefined || term === '') {
      return;
    }
  
    this.change.emit(term);
  
    const researches = this.searchService.search(term);
    researches.map(research => {
      research.request.subscribe(data => this.search.emit({
        data,
        source: research.source
      }))
    });
  }

}
