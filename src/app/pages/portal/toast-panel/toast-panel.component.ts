import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { getEntityTitle, EntityStore, ActionStore, Action, ActionbarMode } from '@igo2/common';
import { Feature, SearchResult, IgoMap, FeatureMotion, createOverlayMarkerStyle } from '@igo2/geo';
import { Media, MediaService, LanguageService } from '@igo2/core';

@Component({
  selector: 'app-toast-panel',
  templateUrl: './toast-panel.component.html',
  styleUrls: ['./toast-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastPanelComponent implements OnInit {
  static SWIPE_ACTION = {
    RIGHT: 'swiperight',
    LEFT: 'swipeleft',
    UP: 'swipeup',
    DOWN: 'swipedown'
  };

  @Input()
  get map(): IgoMap {
    return this._map;
  }
  set map(value: IgoMap) {
    this._map = value;
  }
  private _map: IgoMap;

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

  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    if (value === this._opened) {
      return;
    }

    this._opened = value;
    this.openedChange.emit(this._opened);
  }
  private _opened = true;

  @Input() zoomAuto: boolean;

  private initialize = true;

  public actionStore = new ActionStore([]);
  public actionbarMode = ActionbarMode.Overlay;

  private multiple$ = new BehaviorSubject(false);
  private isResultSelected$ = new BehaviorSubject(false);

  @Output() openedChange = new EventEmitter<boolean>();

  @Output() resultSelect = new EventEmitter<SearchResult<Feature>>();
  @Output() resultFocus = new EventEmitter<SearchResult<Feature>>();

  @Output() zoomAutoEvent = new EventEmitter<boolean>();

  resultSelected$ = new BehaviorSubject<SearchResult<Feature>>(undefined);

  @HostBinding('class.app-toast-panel-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  @HostBinding('style.visibility')
  get displayStyle() {
    if (this.results.length) {
      if (this.results.length === 1 && this.initialize) {
        this.selectResult(this.store.entities$.value[0]);
        this.initialize = false;
      }
      return 'visible';
    }
    return 'hidden';
  }

  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(event: KeyboardEvent) {
    this.clear();
  }

  @HostListener('document:keydown.backspace', ['$event']) onBackHandler(event: KeyboardEvent) {
    this.unselectResult();
  }

  get results(): SearchResult<Feature>[] {
    // return this.store.view.filter((e) => e.meta.dataType === FEATURE).all();
    return this.store.all();
  }

  constructor(
    public mediaService: MediaService,
    public languageService: LanguageService
    ) {}

  ngOnInit() {
    this.actionStore.load([
      {
        id: 'list',
        title: this.languageService.translate.instant('toastPanel.backToList'),
        icon: 'format-list-bulleted-square',
        tooltip: this.languageService.translate.instant('toastPanel.listButton'),
        display: () => {
          return this.isResultSelected$;
        },
        handler: () => {
          this.unselectResult();
        }
      },
      {
        id: 'zoomFeature',
        title: this.languageService.translate.instant('toastPanel.zoomOnFeature'),
        icon: 'magnify-plus-outline',
        tooltip: this.languageService.translate.instant('toastPanel.zoomOnFeatureTooltip'),
        display: () => {
          return this.isResultSelected$;
        },
        handler: () => {
          this.map.overlay.setFeatures([this.resultSelected$.getValue().data], FeatureMotion.Zoom);
        }
      },
      {
        id: 'zoomResults',
        title: this.languageService.translate.instant('toastPanel.zoomOnFeatures'),
        tooltip: this.languageService.translate.instant('toastPanel.zoomOnFeaturesTooltip'),
        icon: 'magnify-plus',
        availability: () => {
          this.store.all().length > 1 ? this.multiple$.next(true) : this.multiple$.next(false);
          return this.multiple$;
        },
        handler: () => {
          const features = [];
          for (const feature of this.store.all()) {
            if (this.isResultSelected$.getValue()) {
              feature.data === this.resultSelected$.getValue().data ?
                feature.data.meta.style = createOverlayMarkerStyle('blue', undefined, 1) :
                  feature.data.meta.style = createOverlayMarkerStyle('blue', undefined, 0.5);
            } else {
              feature.data.meta.style = createOverlayMarkerStyle('blue', undefined, 0.5);
            }
            features.push(feature.data);
          }
          this.map.overlay.setFeatures(features, FeatureMotion.Zoom);
        }
      },
      {
        id: 'zoomAuto',
        title: this.languageService.translate.instant('toastPanel.zoomAuto'),
        tooltip: this.languageService.translate.instant('toastPanel.zoomAutoTooltip'),
        checkbox: true,
        checkCondition: this.zoomAuto,
        handler: () => {
          this.zoomAuto = !this.zoomAuto;
          this.zoomAutoEvent.emit(this.zoomAuto);
          if (this.zoomAuto && this.isResultSelected$.value === true) {
            this.map.overlay.setFeatures([this.resultSelected$.getValue().data], FeatureMotion.Default);
          }
        }
      },
    ]);
  }

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
    this.resultSelected$.getValue().data.meta.style = createOverlayMarkerStyle('blue', undefined, 1);
    this.isResultSelected$.next(true);
    this.resultSelect.emit(result);
  }

  unselectResult() {
    this.resultSelected$.next(undefined);
    this.isResultSelected$.next(false);
    this.resultSelect.emit(undefined);
    this.store.state.clear();

    const features = [];
    for (const feature of this.store.all()) {
      feature.data.meta.style = createOverlayMarkerStyle('blue', undefined, 0.5);
      features.push(feature.data);
    }
    this.map.overlay.setFeatures(features, FeatureMotion.None);
  }

  clear() {
    this.store.clear();
    this.unselectResult();
    this.initialize = true;
  }

  isMobile(): boolean {
    return (
      this.mediaService.getMedia() === Media.Mobile
    );
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
    if (action === ToastPanelComponent.SWIPE_ACTION.RIGHT) {
      this.previousResult();
    } else if (action === ToastPanelComponent.SWIPE_ACTION.LEFT) {
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

  /**
   * Invoke the action handler
   * @internal
   */
  onTriggerAction(action: Action) {
    const args = action.args || [];
    action.handler(...args);
  }
}
