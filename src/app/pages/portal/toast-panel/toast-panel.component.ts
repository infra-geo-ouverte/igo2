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
import { BehaviorSubject, Observable } from 'rxjs';
import olFormatGeoJSON from 'ol/format/GeoJSON';

import {
  getEntityTitle,
  EntityStore,
  ActionStore,
  Action,
  ActionbarMode
} from '@igo2/common';
import {
  Feature,
  SearchResult,
  IgoMap,
  FeatureMotion,
  moveToOlFeatures,
  getMarkerStyle,
  getSelectedMarkerStyle
} from '@igo2/geo';
import {
  Media,
  MediaService,
  LanguageService,
  StorageService,
  StorageScope,
  StorageServiceEvent
} from '@igo2/core';

import { StorageState } from '@igo2/integration';
import { skipWhile } from 'rxjs/operators';
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

  get storageService(): StorageService {
    return this.storageState.storageService;
  }

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
    return this.storageService.get('toastOpened') as boolean;
  }
  set opened(value: boolean) {
    if (value === this.storageService.get('toastOpened')) {
      return;
    }
    this.storageService.set('toastOpened', value, StorageScope.SESSION);

    this.openedChange.emit(this.storageService.get('toastOpened') as boolean);
  }

  get zoomAuto(): boolean {
    return this.storageService.get('zoomAuto') as boolean;
  }

  // To allow the toast to use much larger extent on the map
  get fullExtent(): boolean {
    return this.storageService.get('fullExtent') as boolean;
  }

  public fullExtent$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.fullExtent
  );
  public notfullExtent$: BehaviorSubject<boolean> = new BehaviorSubject(
    !this.fullExtent
  );

  public icon = 'menu';

  public actionStore = new ActionStore([]);
  public actionbarMode = ActionbarMode.Overlay;

  private multiple$ = new BehaviorSubject(false);
  private isResultSelected$ = new BehaviorSubject(false);
  private initialized = true;

  private format = new olFormatGeoJSON();

  public withZoomButton = true;
  zoomAuto$: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  @Output() openedChange = new EventEmitter<boolean>();
  @Output() zoomAutoEvent = new EventEmitter<boolean>();

  @Output() fullExtentEvent = new EventEmitter<boolean>();

  resultSelected$ = new BehaviorSubject<SearchResult<Feature>>(undefined);

  @HostBinding('class.app-toast-panel-opened')
  get hasOpenedClass() {
    return this.opened;
  }

  @HostBinding('style.visibility')
  get displayStyle() {
    if (this.results.length) {
      if (this.results.length === 1 && this.initialized) {
        this.selectResult(this.results[0]);
      }
      return 'visible';
    }
    return 'hidden';
  }

  @HostBinding('class.app-full-toast-panel-opened')
  get hasFullOpenedClass() {
    return this.opened && this.fullExtent;
  }

  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(
    event: KeyboardEvent
  ) {
    this.clear();
  }

  @HostListener('document:keydown.backspace', ['$event']) onBackHandler(
    event: KeyboardEvent
  ) {
    this.unselectResult();
  }

  @HostListener('document:keydown.z', ['$event']) onZoomHandler(
    event: KeyboardEvent
  ) {
    if (this.isResultSelected$.getValue() === true) {
      const olFeature = this.format.readFeature(
        this.resultSelected$.getValue().data,
        {
          dataProjection: this.resultSelected$.getValue().data.projection,
          featureProjection: this.map.projection
        }
      );
      moveToOlFeatures(this.map, [olFeature], FeatureMotion.Default);
    }
  }

  get results(): SearchResult<Feature>[] {
    // return this.store.view.filter((e) => e.meta.dataType === FEATURE).all();
    return this.store.all();
  }

  get multiple(): Observable<boolean> {
    this.results.length
      ? this.multiple$.next(true)
      : this.multiple$.next(false);
    return this.multiple$;
  }

  constructor(
    public mediaService: MediaService,
    public languageService: LanguageService,
    private storageState: StorageState
  ) {

    this.zoomAuto$.next(this.zoomAuto);
    this.storageService.storageChange$
      .pipe(skipWhile((storageChange: StorageServiceEvent) => storageChange.key !== 'zoomAuto'))
      .subscribe((storageChange: StorageServiceEvent) => {
        this.zoomAuto$.next(this.zoomAuto);
      }
      );

  }

  ngOnInit() {
    this.store.entities$.subscribe(() => {
      this.initialized = true;
    });

    this.actionStore.load([
      {
        id: 'list',
        title: this.languageService.translate.instant('toastPanel.backToList'),
        icon: 'format-list-bulleted-square',
        tooltip: this.languageService.translate.instant(
          'toastPanel.listButton'
        ),
        display: () => {
          return this.isResultSelected$;
        },
        handler: () => {
          this.unselectResult();
        }
      },
      {
        id: 'zoomFeature',
        title: this.languageService.translate.instant(
          'toastPanel.zoomOnFeature'
        ),
        icon: 'magnify-plus-outline',
        tooltip: this.languageService.translate.instant(
          'toastPanel.zoomOnFeatureTooltip'
        ),
        display: () => {
          return this.isResultSelected$;
        },
        handler: () => {
          const olFeature = this.format.readFeature(
            this.resultSelected$.getValue().data,
            {
              dataProjection: this.resultSelected$.getValue().data.projection,
              featureProjection: this.map.projection
            }
          );
          moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
        }
      },
      {
        id: 'zoomResults',
        title: this.languageService.translate.instant(
          'toastPanel.zoomOnFeatures'
        ),
        tooltip: this.languageService.translate.instant(
          'toastPanel.zoomOnFeaturesTooltip'
        ),
        icon: 'magnify-scan',
        availability: () => {
          return this.multiple;
        },
        handler: () => {
          const olFeatures = [];
          for (const result of this.store.all()) {
            const olFeature = this.format.readFeature(result.data, {
              dataProjection: result.data.projection,
              featureProjection: this.map.projection
            });
            olFeatures.push(olFeature);
          }
          moveToOlFeatures(this.map, olFeatures, FeatureMotion.Zoom);
        }
      },
      {
        id: 'zoomAuto',
        title: this.languageService.translate.instant('toastPanel.zoomAuto'),
        tooltip: this.languageService.translate.instant(
          'toastPanel.zoomAutoTooltip'
        ),
        checkbox: true,
        checkCondition: this.zoomAuto$,
        handler: () => {
          this.storageService.set('zoomAuto', !this.storageService.get(
            'zoomAuto'
          ) as boolean);
          this.zoomAutoEvent.emit(this.zoomAuto);
          if (this.zoomAuto && this.isResultSelected$.value === true) {
            this.selectResult(this.resultSelected$.getValue());
          }
        }
      },
      {
        id: 'fullExtent',
        title: this.languageService.translate.instant('toastPanel.fullExtent'),
        tooltip: this.languageService.translate.instant(
          'toastPanel.fullExtentTooltip'
        ),
        icon: 'resize',
        display: () => {
          return this.notfullExtent$;
        },
        handler: () => {
          this.storageService.set('fullExtent', true);
          this.fullExtent$.next(true);
          this.notfullExtent$.next(false);
          this.fullExtentEvent.emit(this.fullExtent);
        }
      },
      {
        id: 'standardExtent',
        title: this.languageService.translate.instant(
          'toastPanel.standardExtent'
        ),
        tooltip: this.languageService.translate.instant(
          'toastPanel.standardExtentTooltip'
        ),
        icon: 'resize',
        display: () => {
          return this.fullExtent$;
        },
        handler: () => {
          this.storageService.set('fullExtent', false);
          this.fullExtent$.next(false);
          this.notfullExtent$.next(true);
          this.fullExtentEvent.emit(this.fullExtent);
        }
      }
    ]);
  }

  getTitle(result: SearchResult) {
    return getEntityTitle(result);
  }

  focusResult(result: SearchResult<Feature>) {
    this.map.overlay.removeFeature(result.data);

    result.data.meta.style = getSelectedMarkerStyle(result.data);
    result.data.meta.style.setZIndex(2000);
    this.map.overlay.addFeature(result.data, FeatureMotion.None);
  }

  unfocusResult(result: SearchResult<Feature>, force?) {
    if (!force && this.store.state.get(result).focused) {
      return;
    }
    this.map.overlay.removeFeature(result.data);

    result.data.meta.style = getMarkerStyle(result.data);
    result.data.meta.style.setZIndex(undefined);
    this.map.overlay.addFeature(result.data, FeatureMotion.None);
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

    const features = [];
    for (const feature of this.store.all()) {
      if (feature.meta.id === result.meta.id) {
        feature.data.meta.style = getSelectedMarkerStyle(feature.data);
        feature.data.meta.style.setZIndex(2000);
      } else {
        feature.data.meta.style = getMarkerStyle(feature.data);
      }
      features.push(feature.data);
    }
    this.map.overlay.removeFeatures(features);
    this.map.overlay.addFeatures(features, FeatureMotion.None);

    if (this.zoomAuto) {
      const olFeature = this.format.readFeature(
        this.resultSelected$.getValue().data,
        {
          dataProjection: this.resultSelected$.getValue().data.projection,
          featureProjection: this.map.projection
        }
      );
      moveToOlFeatures(this.map, [olFeature], FeatureMotion.Default);
    }

    this.isResultSelected$.next(true);
    this.initialized = false;
  }

  unselectResult() {
    this.resultSelected$.next(undefined);
    this.isResultSelected$.next(false);
    this.store.state.clear();

    const features = [];
    for (const feature of this.store.all()) {
      feature.data.meta.style = getMarkerStyle(feature.data);
      features.push(feature.data);
    }
    this.map.overlay.setFeatures(features, FeatureMotion.None, 'map');
  }

  clear() {
    this.map.overlay.removeFeatures(this.store.all().map(f => f.data));
    this.store.clear();
    this.unselectResult();
  }

  isMobile(): boolean {
    return this.mediaService.getMedia() === Media.Mobile;
  }

  handleKeyboardEvent(event) {
    event.preventDefault();
    if (event.keyCode === 37) {
      this.previousResult();
    } else if (event.keyCode === 39) {
      this.nextResult();
    }
  }

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

  zoomTo() {
    const olFeature = this.format.readFeature(
      this.resultSelected$.getValue().data,
      {
        dataProjection: this.resultSelected$.getValue().data.projection,
        featureProjection: this.map.projection
      }
    );
    moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
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
    if ((e.target as any).className !== 'igo-panel-title') {
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
