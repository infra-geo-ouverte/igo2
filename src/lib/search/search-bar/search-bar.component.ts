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

import { EntityStore } from 'src/lib/entity';
import { SearchResult, SearchService, Research } from '../shared';

@Component({
  selector: 'fadq-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent implements OnInit, OnDestroy {

  @Input()
  get term(): string {
    return this._term;
  }
  set term(value: string) {
    this._term = value;
  }
  private _term = '';

  @Input()
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
  }
  private _placeholder = '';

  @Input()
  get floatLabel(): FloatLabelType {
    return this._floatLabel;
  }
  set floatLabel(value: FloatLabelType) {
    this._floatLabel = value;
  }
  private _floatLabel: FloatLabelType = 'auto';

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
  }
  private _disabled = false;

  @Input()
  get color(): string {
    return this._color;
  }
  set color(value: string) {
    this._color = value;
  }
  private _color = 'primary';

  @Input()
  get debounce(): number {
    return this._debounce;
  }
  set debounce(value: number) {
    this._debounce = value;
  }
  private _debounce = 300;

  @Input()
  get minLength(): number {
    return this._minLength;
  }
  set minLength(value: number) {
    this._minLength = value;
  }
  private _minLength = 2;

  @Input()
  get searchIcon(): string {
    return this._searchIcon;
  }
  set searchIcon(value: string) {
    this._searchIcon = value;
  }
  private _searchIcon;

  @Input()
  get store(): EntityStore<SearchResult> {
    return this._store;
  }
  set store(value: EntityStore<SearchResult>) {
    this._store = value;
  }
  private _store;

  private readonly invalidKeys = ['Control', 'Shift', 'Alt'];
  private stream$ = new Subject<string>();
  private stream$$: Subscription;

  @Output() change = new EventEmitter<string>();
  @Output() search = new EventEmitter<{
    research: Research;
    results: SearchResult[];
  }>();

  @ViewChild('input') input: ElementRef;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.stream$$ = this.stream$
      .pipe(
        debounceTime(this._debounce),
        distinctUntilChanged()
      )
      .subscribe((term: string) => this.onTermChange(term));
  }

  ngOnDestroy() {
    this.stream$$.unsubscribe();
  }

  onKeyup(event: KeyboardEvent) {
    const key = (event.target as HTMLInputElement).value;
    if (!this.keyIsValid(key)) {
      return;
    }
    this.setTerm(key);
  }

  onClearButtonClick() {
    this.clear();
  }

  private setTerm(term: string) {
    if (this.disabled) {
      return;
    }

    this.term = term;
    if (term.length >= this.minLength || term.length === 0) {
      this.stream$.next(term);
    }
  }

  private clear() {
    this.term = '';
    this.stream$.next(this.term);
    this.input.nativeElement.focus();
  }

  private keyIsValid(key: string) {
    return this.invalidKeys.indexOf(key) === -1;
  }

  private onTermChange(term: string | undefined) {
    if (term === undefined || term === '') {
      if (this.store !== undefined) {
        this.store.clear();
      }
      return;
    }

    this.change.emit(term);
    if (this.store !== undefined) {
      this.store.clear(true);
    }

    const researches = this.searchService.search(term);
    researches.map(research => {
      research.request.subscribe((results: SearchResult[]) => {
          this.onResearchCompleted(research, results);
      });
    });
  }

  private onResearchCompleted(research: Research, results: SearchResult[]) {
    this.search.emit({research, results});

    if (this.store !== undefined) {
      const newResults = this.store.entities
        .filter(result => result.source !== research.source)
        .concat(results);
      this.store.setEntities(newResults, true);
    }
  }

}
