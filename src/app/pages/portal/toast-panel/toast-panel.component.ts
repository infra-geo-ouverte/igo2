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

import { getEntityTitle, EntityStore, ActionStore, Action, ActionbarMode } from '@igo2/common';
import { Feature, SearchResult, IgoMap, FeatureMotion, moveToOlFeatures, createOverlayMarkerStyle, createOverlayDefaultStyle } from '@igo2/geo';
import { Media, MediaService, LanguageService, StorageService } from '@igo2/core';

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

  get zoomAuto(): boolean {
    if (this.storageService.get('zoomAuto') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  // To allow the toast to use much larger extent on the map
  get fullExtent() {
    if (this.storageService.get('fullExtent') === 'true') {
      return true;
    } else {
      return false;
    }
  }

  public fullExtent$: BehaviorSubject<boolean> = new BehaviorSubject(this.fullExtent);
  public notfullExtent$: BehaviorSubject<boolean> = new BehaviorSubject(!this.fullExtent);

  public icon = 'menu';

  public actionStore = new ActionStore([]);
  public actionbarMode = ActionbarMode.Overlay;

  private multiple$ = new BehaviorSubject(false);
  private isResultSelected$ = new BehaviorSubject(false);
  private initialized = true;

  private format = new olFormatGeoJSON();

  public withZoomButton = true;

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

  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(event: KeyboardEvent) {
    this.clear();
  }

  @HostListener('document:keydown.backspace', ['$event']) onBackHandler(event: KeyboardEvent) {
    this.unselectResult();
  }

  @HostListener('document:keydown.z', ['$event']) onZoomHandler(event: KeyboardEvent) {
    if (this.isResultSelected$.getValue() === true) {
      const olFeature = this.format.readFeature(this.resultSelected$.getValue().data, {
        dataProjection: this.resultSelected$.getValue().data.projection,
        featureProjection: this.map.projection
      });
      moveToOlFeatures(this.map, [olFeature], FeatureMotion.Default);
    }
  }

  get results(): SearchResult<Feature>[] {
    // return this.store.view.filter((e) => e.meta.dataType === FEATURE).all();
    return this.store.all();
  }

  get multiple(): Observable<boolean> {
    this.results.length ? this.multiple$.next(true) : this.multiple$.next(false);
    return this.multiple$;
  }

  private getSelectedMarkerStyle(feature: Feature)  {
    if (!feature.geometry || feature.geometry.type === 'Point') {
      return createOverlayMarkerStyle({text: feature.meta.mapTitle, outlineColor: [0, 255, 255]});
    } else {
      return createOverlayDefaultStyle({text: feature.meta.mapTitle, strokeWidth: 4, strokeColor: [0, 255, 255]});
    }
  }

  private getMarkerStyle(feature: Feature) {
    if (!feature.geometry || feature.geometry.type === 'Point') {
      return createOverlayMarkerStyle({text: feature.meta.mapTitle, opacity: 0.5, outlineColor: [0, 255, 255]});
    } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
      return createOverlayDefaultStyle({text: feature.meta.mapTitle, strokeOpacity: 0.5, strokeColor: [0, 255, 255]});
    } else {
      return createOverlayDefaultStyle({text: feature.meta.mapTitle, fillOpacity: 0.15, strokeColor: [0, 255, 255]});
    }
  }

  constructor(
    public mediaService: MediaService,
    public languageService: LanguageService,
    private storageService: StorageService
    ) {}

  ngOnInit() {
    this.store.entities$.subscribe(() => {
      this.initialized = true;
    });

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
          const olFeature = this.format.readFeature(this.resultSelected$.getValue().data, {
            dataProjection: this.resultSelected$.getValue().data.projection,
            featureProjection: this.map.projection
          });
          moveToOlFeatures(this.map, [olFeature], FeatureMotion.Zoom);
        }
      },
      {
        id: 'zoomResults',
        title: this.languageService.translate.instant('toastPanel.zoomOnFeatures'),
        tooltip: this.languageService.translate.instant('toastPanel.zoomOnFeaturesTooltip'),
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
        tooltip: this.languageService.translate.instant('toastPanel.zoomAutoTooltip'),
        checkbox: true,
        checkCondition: this.storageService.get('zoomAuto') === 'true',
        handler: () => {
          this.storageService.get('zoomAuto') === 'true' ? this.storageService.set('zoomAuto', 'false') :
            this.storageService.set('zoomAuto', 'true');
          this.zoomAutoEvent.emit(this.zoomAuto);
          if (this.zoomAuto && this.isResultSelected$.value === true) {
            this.selectResult(this.resultSelected$.getValue());
          }
        }
      },
      {
        id: 'fullExtent',
        title: this.languageService.translate.instant('toastPanel.fullExtent'),
        tooltip: this.languageService.translate.instant('toastPanel.fullExtentTooltip'),
        icon: 'resize',
        display: () => {
          return this.notfullExtent$;
        },
        handler: () => {
          this.storageService.set('fullExtent', 'true');
          this.fullExtent$.next(true);
          this.notfullExtent$.next(false);
          this.fullExtentEvent.emit(this.fullExtent);
        }
      },
      {
        id: 'standardExtent',
        title: this.languageService.translate.instant('toastPanel.standardExtent'),
        tooltip: this.languageService.translate.instant('toastPanel.standardExtentTooltip'),
        icon: 'resize',
        display: () => {
          return this.fullExtent$;
        },
        handler: () => {
          this.storageService.set('fullExtent', 'false');
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

    result.data.meta.style = this.getSelectedMarkerStyle(result.data);
    result.data.meta.style.setZIndex(2000);
    this.map.overlay.addFeature(result.data, FeatureMotion.None);
  }

  unfocusResult(result: SearchResult<Feature>, force?) {
    if (!force && this.store.state.get(result).focused) {
      return;
    }
    this.map.overlay.removeFeature(result.data);

    result.data.meta.style = this.getMarkerStyle(result.data);
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
        feature.data.meta.style = this.getSelectedMarkerStyle(feature.data);
        feature.data.meta.style.setZIndex(2000);
      } else {
        feature.data.meta.style = this.getMarkerStyle(feature.data);
      }
      features.push(feature.data);
    }
    this.map.overlay.removeFeatures(features);
    this.map.overlay.addFeatures(features, FeatureMotion.None);

    if (this.zoomAuto) {
      const olFeature = this.format.readFeature(this.resultSelected$.getValue().data, {
        dataProjection: this.resultSelected$.getValue().data.projection,
        featureProjection: this.map.projection
      });
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
      feature.data.meta.style = this.getMarkerStyle(feature.data);
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
    return (
      this.mediaService.getMedia() === Media.Mobile
    );
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
    const olFeature = this.format.readFeature(this.resultSelected$.getValue().data, {
      dataProjection: this.resultSelected$.getValue().data.projection,
      featureProjection: this.map.projection
    });
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
