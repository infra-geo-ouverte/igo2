import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { getEntityTitle, EntityStore } from '@igo2/common';
import { Feature, SearchResult } from '@igo2/geo';

@Component({
  selector: 'app-toast-panel',
  templateUrl: './toast-panel.component.html',
  styleUrls: ['./toast-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastPanelComponent {
  @Input()
  get store(): EntityStore<SearchResult<Feature>> {
    return this._store;
  }
  set store(value: EntityStore<SearchResult<Feature>>) {
    this._store = value;
    this.store.entities$.subscribe(_entities => {
      this.unselectResult();
    });
  }
  private _store: EntityStore<SearchResult<Feature>>;

  @Output() resultSelect = new EventEmitter<SearchResult<Feature>>();
  @Output() resultFocus = new EventEmitter<SearchResult<Feature>>();

  static SWIPE_ACTION = {
    RIGHT: 'swiperight',
    LEFT: 'swipeleft',
    UP: 'swipeup',
    DOWN: 'swipedown'
  };

  resultSelected$ = new BehaviorSubject<SearchResult<Feature>>(undefined);

  private opened = true;

  @HostBinding('class.app-toast-panel-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  @HostBinding('style.visibility')
  get displayStyle() {
    return this.results.length ? 'visible' : 'hidden';
  }

  get results(): SearchResult<Feature>[] {
    // return this.store.view.filter((e) => e.meta.dataType === FEATURE).all();
    return this.store.all();
  }

  constructor() {}

  getTitle(result: SearchResult) {
    return getEntityTitle(result);
  }

  focusResult(result: SearchResult<Feature>) {
    this.resultFocus.emit(result);
  }

  selectResult(result: SearchResult<Feature>) {
    this.store.state.update(
      result,
      {
        focused: true,
        selected: true
      },
      true
    );
    this.resultSelected$.next(result);
    this.resultSelect.emit(result);
  }

  unselectResult() {
    this.resultSelected$.next(undefined);
    this.store.state.clear();
  }

  clear() {
    this.store.clear();
    this.unselectResult();
  }

  @HostListener('document:keydown.ArrowLeft')
  previousResult() {
    if (!this.resultSelected$.value) {
      return;
    }
    let i = this.results.indexOf(this.resultSelected$.value);
    const previousResult = this.results[--i];
    if (previousResult) {
      this.selectResult(previousResult);
    }
  }

  @HostListener('document:keydown.ArrowRight')
  nextResult() {
    if (!this.resultSelected$.value) {
      return;
    }
    let i = this.results.indexOf(this.resultSelected$.value);
    const nextResult = this.results[++i];
    if (nextResult) {
      this.selectResult(nextResult);
    }
  }

  swipe(action: string) {
    if (action === ToastPanelComponent.SWIPE_ACTION.LEFT) {
      this.previousResult();
    } else if (action === ToastPanelComponent.SWIPE_ACTION.RIGHT) {
      this.nextResult();
    } else if (action === ToastPanelComponent.SWIPE_ACTION.UP) {
      this.opened = true;
    } else if (action === ToastPanelComponent.SWIPE_ACTION.DOWN) {
      this.opened = false;
    }
  }

  onToggleClick(e: MouseEvent) {
    if (e.srcElement.className !== 'igo-panel-title') {
      return;
    }
    this.opened = !this.opened;
  }
}
