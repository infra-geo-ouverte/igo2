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

  @Input() zoomAuto = false;

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
      return createOverlayMarkerStyle({text: feature.meta.mapTitle});
    } else {
      return createOverlayDefaultStyle({text: feature.meta.mapTitle, strokeWidth: 4});
    }
  }

  private getMarkerStyle(feature: Feature) {
    if (!feature.geometry || feature.geometry.type === 'Point') {
      return createOverlayMarkerStyle({text: feature.meta.mapTitle, opacity: 0.5});
    } else if (feature.geometry.type === 'LineString' || feature.geometry.type === 'MultiLineString') {
      return createOverlayDefaultStyle({text: feature.meta.mapTitle, strokeOpacity: 0.5});
    } else {
      return createOverlayDefaultStyle({text: feature.meta.mapTitle, fillOpacity: 0.15});
    }
  }

  constructor(
    public mediaService: MediaService,
    public languageService: LanguageService
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
        checkCondition: this.zoomAuto,
        handler: () => {
          this.zoomAuto = !this.zoomAuto;
          this.zoomAutoEvent.emit(this.zoomAuto);
          if (this.zoomAuto && this.isResultSelected$.value === true) {
            this.selectResult(this.resultSelected$.getValue());
          }
        }
      },
    ]);
  }

  getTitle(result: SearchResult) {
    return getEntityTitle(result);
  }

  focusResult(result: SearchResult<Feature>) {
    result.data.meta.style = this.getSelectedMarkerStyle(result.data);
    this.map.overlay.setFeatures(this.store.all().map(f => f.data), FeatureMotion.None);
  }

  unfocusResult(result: SearchResult<Feature>, force?) {
    if (!force && this.store.state.get(result).focused) {
      return;
    }

    result.data.meta.style = this.getMarkerStyle(result.data);
    this.map.overlay.setFeatures(this.store.all().map(f => f.data), FeatureMotion.None);
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
      feature.data === this.resultSelected$.getValue().data ?
        feature.data.meta.style = this.getSelectedMarkerStyle(feature.data) :
          feature.data.meta.style = this.getMarkerStyle(feature.data);
      features.push(feature.data);
    }
    this.map.overlay.setFeatures(features, FeatureMotion.None);

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
    this.map.overlay.setFeatures(features, FeatureMotion.None);
  }

  clear() {
    this.store.clear();
    this.unselectResult();
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
