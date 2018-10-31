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

import { DataStore } from '../../data/shared/datastore';
import { Record } from '../../data/shared/data.interface';
import { SearchSource } from '../shared/sources/source';
import { SearchService } from '../shared/search.service';

export interface SearchEvent {
  records: Record[];
  source: SearchSource;
}

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
  get dataStore(): DataStore {
    return this._dataStore;
  }
  set dataStore(value: DataStore) {
    this._dataStore = value;
  }
  private _dataStore;

  private readonly invalidKeys = ['Control', 'Shift', 'Alt'];
  private stream$ = new Subject<string>();
  private stream$$: Subscription;

  @Output() change = new EventEmitter<string>();
  @Output() search = new EventEmitter<SearchEvent>();

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
      if (this.dataStore !== undefined) {
        this.dataStore.clear();
      }
      return;
    }

    this.change.emit(term);
    if (this.dataStore !== undefined) {
      this.dataStore.clear(true);
    }

    const researches = this.searchService.search(term);
    researches.map(research => {
      research.request.subscribe(records => this.handleResearchComplete(
        records,
        research.source
      ));
    });
  }

  private handleResearchComplete(records: Record[], source: SearchSource) {
    this.search.emit({records, source});

    if (this.dataStore !== undefined) {
      const newRecords = this.dataStore.getRecords()
        .filter(record =>  record.provider !== source)
        .concat(records);
      this.dataStore.setRecords(newRecords, true);
    }
  }

}
