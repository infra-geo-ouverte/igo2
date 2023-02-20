import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, Subscription } from 'rxjs';
import { debounceTime, map, skipWhile, tap } from 'rxjs/operators';
import olFormatGeoJSON from 'ol/format/GeoJSON';
import olFeature from 'ol/Feature';
import olPoint from 'ol/geom/Point';

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
  featureToOl,
  featuresAreTooDeepInView,
  featureFromOl,
  getCommonVectorStyle,
  getCommonVectorSelectedStyle,
  featuresAreOutOfView,
  computeOlFeaturesExtent
} from '@igo2/geo';
import {
  Media,
  MediaService,
  LanguageService,
  StorageService,
  StorageScope,
  StorageServiceEvent,
  ConfigService
} from '@igo2/core';
import { QueryState, StorageState } from '@igo2/integration';

@Component({
  selector: 'app-toast-panel',
  templateUrl: './toast-panel.component.html',
  styleUrls: ['./toast-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToastPanelComponent implements OnInit, OnDestroy {
  static SWIPE_ACTION = {
    RIGHT: 'swiperight',
    LEFT: 'swipeleft',
    UP: 'swipeup',
    DOWN: 'swipedown'
  };

  public tabsMode = false;

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
    this.store.entities$.subscribe((_entities) => {
      this.unselectResult();
    });
  }
  private _store: EntityStore<SearchResult<Feature>>;

  @Input()
  get opened(): boolean {
    return this._opened;
  }
  set opened(value: boolean) {
    if (value !== !this._opened) {
      return;
    }
    this._opened = value;
    this.storageService.set('toastOpened', value, StorageScope.SESSION);
    this.openedChange.emit(value);
  }
  private _opened = true;

  @Input() hasFeatureEmphasisOnSelection: Boolean = false;

  get zoomAuto(): boolean {
    return this._zoomAuto;
  }
  set zoomAuto(value) {
    if (value !== !this._zoomAuto) {
      return;
    }
    this._zoomAuto = value;
    this.zoomAuto$.next(value);
    this.storageService.set('zoomAuto', value);
  }
  private _zoomAuto = false;

  // To allow the toast to use much larger extent on the map
  get fullExtent(): boolean {
    return this._fullExtent;
  }
  set fullExtent(value) {
    if (value !== !this._fullExtent) {
      return;
    }
    this._fullExtent = value;
    this.fullExtent$.next(value);
    this.fullExtentEvent.emit(value);
    this.storageService.set('fullExtent', value);
  }
  private _fullExtent = false;

  public fullExtent$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.fullExtent
  );
  public isHtmlDisplay = false;
  public iconResizeWindows = '';

  public icon = 'menu';

  public actionStore = new ActionStore([]);
  public actionbarMode = ActionbarMode.Overlay;

  private multiple$ = new BehaviorSubject(false);
  private isResultSelected$ = new BehaviorSubject(false);
  public isSelectedResultOutOfView$ = new BehaviorSubject(false);
  private isSelectedResultOutOfView$$: Subscription;
  private storageChange$$: Subscription;
  private initialized = true;

  private format = new olFormatGeoJSON();

  private resultOrResolution$$: Subscription;
  private focusedResult$: BehaviorSubject<
    SearchResult<Feature>
  > = new BehaviorSubject(undefined);
  private abstractFocusedOrSelectedResult: Feature;

  public withZoomButton = true;
  zoomAuto$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @Output() openedChange = new EventEmitter<boolean>();

  @Output() fullExtentEvent = new EventEmitter<boolean>();
  @Output() windowHtmlDisplayEvent = new EventEmitter<boolean>();

  resultSelected$ = new BehaviorSubject<SearchResult<Feature>>(undefined);

  // @HostBinding('class.app-toast-panel-opened')
  // get hasOpenedClass() {
  //   return this.opened;
  // }

  // @HostBinding('class.app-full-toast-panel-collapsed')
  // get hasFullCollapsedClass() {
  //   return !this.opened && this.fullExtent;
  // }
  getClassPanel() {
    return {
      'app-toast-panel-opened' : this.opened && !this.fullExtent && !this.isHtmlDisplay,
      'app-full-toast-panel-opened' :
        this.opened && this.fullExtent &&
        !this.isHtmlDisplay,

      'app-toast-panel-html' :
        this.opened &&
        !this.fullExtent &&
        this.resultSelected$.value &&
        this.isHtmlDisplay,

      'app-toast-panel-html-large' :
        this.opened &&
        this.fullExtent &&
        this.resultSelected$.value &&
        this.isHtmlDisplay,

      'app-toast-panel-collapsed': !this.opened && !this.fullExtent && !this.isHtmlDisplay,
      'app-full-toast-panel-collapsed' : !this.opened && this.fullExtent && !this.isHtmlDisplay,
      'app-toast-panel-html-collapsed' : !this.opened && this.isHtmlDisplay
    };
  }

  // specific design
  getSpecificDesignIdSelector() {
    if(this.tabsMode && !this.fullExtent && !this.isHtmlDisplay) {
      return 'app-toast-panel-opened-max-height';
    } else if(this.tabsMode && this.opened &&
      this.fullExtent && !this.isHtmlDisplay) {
      return 'app-full-toast-panel-opened-max-height';
    }
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

  // @HostBinding('class.app-full-toast-panel-opened')
  // get hasFullOpenedClass() {
  //   return this.opened && this.fullExtent;
  // }

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
      const localOlFeature = this.format.readFeature(
        this.resultSelected$.getValue().data,
        {
          dataProjection: this.resultSelected$.getValue().data.projection,
          featureProjection: this.map.projection
        }
      );
      moveToOlFeatures(this.map, [localOlFeature], FeatureMotion.Default);
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
    private storageState: StorageState,
    private queryState: QueryState,
    private configService: ConfigService
  ) {
    this.tabsMode = this.configService.getConfig('queryTabs')
      ? this.configService.getConfig('queryTabs')
      : false;
    this.opened = this.storageService.get('toastOpened') as boolean;
    this.zoomAuto = this.storageService.get('zoomAuto') as boolean;
    this.fullExtent = this.storageService.get('fullExtent') as boolean;
    this.setResizeWindowIcon();
  }

  private monitorResultOutOfView() {
    this.isSelectedResultOutOfView$$ = combineLatest([
      this.map.viewController.state$,
      this.resultSelected$
    ])
      .pipe(debounceTime(100))
      .subscribe((bunch) => {
        const selectedResult = bunch[1];
        if (!selectedResult) {
          this.isSelectedResultOutOfView$.next(false);
          return;
        }
        const selectedOlFeature = featureToOl(selectedResult.data, this.map.projection);
        const selectedOlFeatureExtent = computeOlFeaturesExtent(this.map, [selectedOlFeature]);
        this.isSelectedResultOutOfView$.next(featuresAreOutOfView(this.map, selectedOlFeatureExtent));
      });
  }


  ngOnInit() {
    this.store.entities$.subscribe(() => {
      this.initialized = true;
    });
    this.monitorResultOutOfView();

    let latestResult;
    let trigger;
    if (this.hasFeatureEmphasisOnSelection) {
      this.resultOrResolution$$ = combineLatest([
        this.focusedResult$.pipe(
          tap((res) => {
            latestResult = res;
            trigger = 'focused';
          })
        ),
        this.resultSelected$.pipe(
          tap((res) => {
            latestResult = res;
            trigger = 'selected';
          })
        ),
        this.map.viewController.resolution$,
        this.store.entities$
      ]).subscribe(() => this.buildResultEmphasis(latestResult, trigger));
    }

    this.storageChange$$ = this.storageService.storageChange$
      .pipe(skipWhile((storageChange: StorageServiceEvent) => storageChange.key !== 'zoomAuto'))
      .subscribe((change) => {
        this.zoomAuto = change.currentValue;
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
          const localOlFeature = this.format.readFeature(
            this.resultSelected$.getValue().data,
            {
              dataProjection: this.resultSelected$.getValue().data.projection,
              featureProjection: this.map.projection
            }
          );
          moveToOlFeatures(this.map, [localOlFeature], FeatureMotion.Zoom);
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
            const localOlFeature = this.format.readFeature(result.data, {
              dataProjection: result.data.projection,
              featureProjection: this.map.projection
            });
            olFeatures.push(localOlFeature);
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
          this.zoomAuto = !this.zoomAuto;
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
        icon: 'arrow-expand',
        display: () => {
          return this.fullExtent$.pipe(map((v) => !v && !this.isDesktop()));
        },
        handler: () => {
          this.fullExtent = true;
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
        icon: 'arrow-collapse',
        display: () => {
          return this.fullExtent$.pipe(map((v) => v && !this.isDesktop()));
        },
        handler: () => {
          this.fullExtent = false;
        }
      }
    ]);
  }

  ngOnDestroy(): void {
    if (this.resultOrResolution$$) {
      this.resultOrResolution$$.unsubscribe();
    }
    if (this.isSelectedResultOutOfView$$) {
      this.isSelectedResultOutOfView$$.unsubscribe();
    }
    if (this.storageChange$$) {
      this.storageChange$$.unsubscribe();
    }
  }

  private buildResultEmphasis(
    result: SearchResult<Feature>,
    trigger: 'selected' | 'focused' | undefined
  ) {
    this.clearFeatureEmphasis();
    if (!result || (trigger === 'selected' && this.zoomAuto)) {
      return;
    }
    const myOlFeature = featureToOl(result.data, this.map.projection);
    const olGeometry = myOlFeature.getGeometry();
    if (featuresAreTooDeepInView(this.map, olGeometry.getExtent() as [number, number, number, number], 0.0025)) {
      const extent = olGeometry.getExtent();
      const x = extent[0] + (extent[2] - extent[0]) / 2;
      const y = extent[1] + (extent[3] - extent[1]) / 2;
      const feature1 = new olFeature({
        name: 'abstractFocusedOrSelectedResult',
        geometry: new olPoint([x, y])
      });
      this.abstractFocusedOrSelectedResult = featureFromOl(
        feature1,
        this.map.projection
      );
      this.abstractFocusedOrSelectedResult.meta.style =
        getCommonVectorSelectedStyle(
          Object.assign({},
            { feature: this.abstractFocusedOrSelectedResult },
            trigger === 'selected' ?
              this.queryState.queryOverlayStyleSelection :
              this.queryState.queryOverlayStyleFocus));
      this.abstractFocusedOrSelectedResult.meta.style.setZIndex(2000);
      this.map.queryResultsOverlay.addFeature(
        this.abstractFocusedOrSelectedResult,
        FeatureMotion.None
      );
    }
  }

  private clearFeatureEmphasis() {
    if (this.abstractFocusedOrSelectedResult) {
      this.map.queryResultsOverlay.removeFeature(this.abstractFocusedOrSelectedResult);
      this.abstractFocusedOrSelectedResult = undefined;
    }
  }

  getTitle(result: SearchResult) {
    return getEntityTitle(result);
  }

  focusResult(result: SearchResult<Feature>) {
    this.focusedResult$.next(result);
    this.map.queryResultsOverlay.removeFeature(result.data);

    result.data.meta.style = getCommonVectorSelectedStyle(
      Object.assign({},
        { feature: result.data },
        this.queryState.queryOverlayStyleFocus));
    result.data.meta.style.setZIndex(2000);
    this.map.queryResultsOverlay.addFeature(result.data, FeatureMotion.None);
  }

  unfocusResult(result: SearchResult<Feature>, force?) {
    this.focusedResult$.next(undefined);
    if (!force && this.store.state.get(result).focused) {
      return;
    }
    this.map.queryResultsOverlay.removeFeature(result.data);

    result.data.meta.style = getCommonVectorStyle(
      Object.assign({},
        { feature: result.data },
        this.queryState.queryOverlayStyle));
    result.data.meta.style.setZIndex(undefined);
    this.map.queryResultsOverlay.addFeature(result.data, FeatureMotion.None);
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
    if (result.data.properties && result.data.properties.target === 'iframe') {
      this.setHtmlDisplay(true);
    } else {
      this.setHtmlDisplay(false);
    }

    const features = [];
    for (const feature of this.store.all()) {
      if (feature.meta.id === result.meta.id) {
        feature.data.meta.style = getCommonVectorSelectedStyle(
          Object.assign({}, { feature: feature.data },
            this.queryState.queryOverlayStyleSelection));
        feature.data.meta.style.setZIndex(2000);
      } else {
        feature.data.meta.style = getCommonVectorStyle(
          Object.assign({},
            { feature: feature.data },
            this.queryState.queryOverlayStyle));
      }
      features.push(feature.data);
    }
    this.map.queryResultsOverlay.removeFeatures(features);
    this.map.queryResultsOverlay.addFeatures(features, FeatureMotion.None);

    if (this.zoomAuto) {
      const localOlFeature = this.format.readFeature(
        this.resultSelected$.getValue().data,
        {
          dataProjection: this.resultSelected$.getValue().data.projection,
          featureProjection: this.map.projection
        }
      );
      moveToOlFeatures(this.map, [localOlFeature], FeatureMotion.Default);
    }

    this.isResultSelected$.next(true);
    this.initialized = false;
  }

  unselectResult() {
    this.resultSelected$.next(undefined);
    this.isResultSelected$.next(false);
    this.setHtmlDisplay(false);
    this.store.state.clear();

    const features = [];
    for (const feature of this.store.all()) {
      feature.data.meta.style = getCommonVectorStyle(
        Object.assign({},
          { feature: feature.data },
          this.queryState.queryOverlayStyle));
      features.push(feature.data);
    }
    this.map.queryResultsOverlay.setFeatures(features, FeatureMotion.None, 'map');
  }

  clear() {
    this.clearFeatureEmphasis();
    this.map.queryResultsOverlay.clear();
    this.store.clear();
    this.unselectResult();
    this.setHtmlDisplay(false);
  }

  isMobile(): boolean {
    return this.mediaService.getMedia() === Media.Mobile;
  }
  isDesktop(): boolean {
    return this.mediaService.isDesktop();
  }

  handleKeyboardEvent(event) {
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
    const localOlFeature = this.format.readFeature(
      this.resultSelected$.getValue().data,
      {
        dataProjection: this.resultSelected$.getValue().data.projection,
        featureProjection: this.map.projection
      }
    );
    moveToOlFeatures(this.map, [localOlFeature], FeatureMotion.Zoom);
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

  setHtmlDisplay(value: boolean) {
    if (value === true) {
      this.isHtmlDisplay = true;
      this.windowHtmlDisplayEvent.emit(true);
    } else {
      this.isHtmlDisplay = false;
      this.windowHtmlDisplayEvent.emit(false);
    }
  }

  isHtmlAndDesktop(): boolean {
    if (this.isHtmlDisplay && this.isDesktop()) {
      return true;
    } else {
      return false;
    }
  }

  setResizeWindowIcon() {
    if (this.fullExtent) {
      this.iconResizeWindows = 'arrow-collapse';
      // this.iconResizeWindows = 'vector-arrange-below';
    } else {
      this.iconResizeWindows = 'arrow-expand';
      // this.iconResizeWindows = 'crop-square';
    }
  }

  resizeWindows() {
    this.storageService.set('fullExtent', !this.fullExtent);
    if (this.fullExtent) {
        this.reduceWindow();
    } else {
        this.enlargeWindows();
      }
  }

  reduceWindow() {
    this.fullExtent = false;
    this.setResizeWindowIcon();
  }

  enlargeWindows() {
    this.fullExtent = true;
    this.setResizeWindowIcon();
  }

}
