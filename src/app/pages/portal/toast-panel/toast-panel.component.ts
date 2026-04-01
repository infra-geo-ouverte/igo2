import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  inject,
  input,
  output
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  Action,
  ActionStore,
  ActionbarComponent,
  ActionbarMode
} from '@igo2/common/action';
import { EntityStore, getEntityTitle } from '@igo2/common/entity';
import { PanelComponent } from '@igo2/common/panel';
import { StopPropagationDirective } from '@igo2/common/stop-propagation';
import { ConfigService } from '@igo2/core/config';
import { LanguageService } from '@igo2/core/language';
import { Media, MediaService } from '@igo2/core/media';
import {
  StorageScope,
  StorageService,
  StorageServiceEvent
} from '@igo2/core/storage';
import {
  FEATURE,
  Feature,
  FeatureDetailsComponent,
  FeatureMotion,
  GeoServiceDefinition,
  IgoMap,
  LayerQueryResultsOlStyleFunction,
  LayerService,
  Overlay,
  PropertyTypeDetectorService,
  SearchResult,
  SearchResultsComponent,
  computeOlFeaturesExtent,
  featureToOl,
  featuresAreOutOfView,
  generateIdFromSourceOptions,
  moveToOlFeatures
} from '@igo2/geo';
import { QueryState, StorageState, WorkspaceState } from '@igo2/integration';
import { ObjectUtils } from '@igo2/utils';

import olFormatGeoJSON from 'ol/format/GeoJSON';

import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, map, skipWhile } from 'rxjs/operators';

interface ExtendedGeoServiceDefinition extends GeoServiceDefinition {
  propertyForUrl: string;
}

@Component({
  selector: 'app-toast-panel',
  templateUrl: './toast-panel.component.html',
  styleUrls: ['./toast-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ActionbarComponent,
    AsyncPipe,
    FeatureDetailsComponent,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    NgClass,
    NgTemplateOutlet,
    PanelComponent,
    SearchResultsComponent,
    StopPropagationDirective,
    TranslateModule
  ]
})
export class ToastPanelComponent implements OnInit, OnDestroy {
  mediaService = inject(MediaService);
  languageService = inject(LanguageService);
  private storageState = inject(StorageState);
  private queryState = inject(QueryState);
  private workspaceState = inject(WorkspaceState);
  private configService = inject(ConfigService);
  private propertyTypeDetectorService = inject(PropertyTypeDetectorService);
  private layerService = inject(LayerService);

  static SWIPE_ACTION = {
    RIGHT: 'swiperight',
    LEFT: 'swipeleft',
    UP: 'swipeup',
    DOWN: 'swipedown'
  };

  public tabsMode: boolean;

  get storageService(): StorageService {
    return this.storageState.storageService;
  }

  readonly map = input<IgoMap>();

  @Input()
  get store(): EntityStore<SearchResult<Feature>> {
    return this._store;
  }
  set store(value: EntityStore<SearchResult<Feature>>) {
    this._store = value;
    this.store.entities$.subscribe(() => {
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

  public potententialLayerToAdd$ = new BehaviorSubject<any>(undefined);
  public potententialLayerisAdded$ = new BehaviorSubject<boolean>(false);

  public fullExtent$ = new BehaviorSubject<boolean>(this.fullExtent);
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

  public queryResultsOverlayFocused: Overlay;
  public queryResultsOverlaySelected: Overlay;
  public queryResultsOverlayAll: Overlay;

  private resultOrResolution$$: Subscription;
  private focusedResult$ = new BehaviorSubject<SearchResult<Feature>>(
    undefined
  );
  private abstractFocusedOrSelectedResult: Feature;

  public withZoomButton = true;
  zoomAuto$ = new BehaviorSubject<boolean>(false);

  readonly openedChange = output<boolean>();

  readonly fullExtentEvent = output<boolean>();
  readonly windowHtmlDisplayEvent = output<boolean>();

  resultSelected$ = new BehaviorSubject<SearchResult<Feature>>(undefined);

  @HostBinding('style.visibility')
  get displayStyle() {
    if (this.results.length) {
      if (this.results.length === 1 && this.initialized) {
        this.onResultSelect(this.results[0]);
      }
      return 'visible';
    }
    return 'hidden';
  }

  @HostListener('document:keydown.escape', ['$event']) onEscapeHandler() {
    this.clear();
  }

  @HostListener('document:keydown.backspace', ['$event']) onBackHandler() {
    this.unselectResult();
  }

  @HostListener('document:keydown.z', ['$event']) onZoomHandler() {
    if (this.isResultSelected$.getValue() === true) {
      const localOlFeature = this.format.readFeature(
        this.resultSelected$.getValue().data,
        {
          dataProjection: this.resultSelected$.getValue().data.projection,
          featureProjection: this.map().projection
        }
      );
      moveToOlFeatures(
        this.map().viewController,
        localOlFeature,
        FeatureMotion.Default
      );
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

  constructor() {
    this.tabsMode = this.configService.getConfig('queryTabs', false);
    this.opened = this.storageService.get('toastOpened') as boolean;
    this.zoomAuto = this.storageService.get('zoomAuto') as boolean;
    this.fullExtent = this.storageService.get('fullExtent') as boolean;
  }

  getClassPanel() {
    return {
      'app-toast-panel-opened':
        this.opened && !this.fullExtent && !this.isHtmlDisplay,
      'app-full-toast-panel-opened':
        this.opened && this.fullExtent && !this.isHtmlDisplay,

      'app-toast-panel-html':
        this.opened &&
        !this.fullExtent &&
        this.resultSelected$.value &&
        this.isHtmlDisplay,

      'app-toast-panel-html-large':
        this.opened &&
        this.fullExtent &&
        this.resultSelected$.value &&
        this.isHtmlDisplay,

      'app-toast-panel-collapsed':
        !this.opened && !this.fullExtent && !this.isHtmlDisplay,
      'app-full-toast-panel-collapsed':
        !this.opened && this.fullExtent && !this.isHtmlDisplay,
      'app-toast-panel-html-collapsed': !this.opened && this.isHtmlDisplay
    };
  }

  // if query tabs mode activated
  // fix Heigh of igo-panel
  setHeighPanelTabsMode() {
    if (this.resultSelected$.value || !this.opened) {
      return '';
    }

    if (this.tabsMode && !this.fullExtent && !this.isHtmlDisplay) {
      return 'app-toast-panel-opened-max-height';
    } else if (
      this.tabsMode &&
      this.opened &&
      this.fullExtent &&
      !this.isHtmlDisplay
    ) {
      return 'app-full-toast-panel-opened-max-height';
    }
  }

  handleShowAllResults(searchResults: SearchResult<Feature>[]) {
    const rec = searchResults
      .filter((sr) => sr.meta.dataType === FEATURE)
      .map((sr) => sr.data as Feature);
    if (rec?.length) {
      this.queryResultsOverlayAll.setFeatures(rec, FeatureMotion.None);
    } else {
      this.queryResultsOverlayFocused.clear();
      this.queryResultsOverlaySelected.clear();
      this.queryResultsOverlayAll.clear();
    }
  }

  private monitorResultOutOfView() {
    this.isSelectedResultOutOfView$$ = combineLatest([
      this.map().viewController.state$,
      this.resultSelected$
    ])
      .pipe(debounceTime(100))
      .subscribe((bunch) => {
        const selectedResult = bunch[1];
        if (!selectedResult) {
          this.isSelectedResultOutOfView$.next(false);
          return;
        }
        const selectedOlFeature = featureToOl(
          selectedResult.data,
          this.map().projectionCode
        );
        const selectedOlFeatureExtent = computeOlFeaturesExtent(
          [selectedOlFeature],
          this.map().viewProjection
        );
        this.isSelectedResultOutOfView$.next(
          featuresAreOutOfView(this.map().getExtent(), selectedOlFeatureExtent)
        );
      });
  }

  ngOnInit() {
    this.queryResultsOverlayAll = new Overlay(this.map());
    this.queryResultsOverlayFocused = new Overlay(this.map());
    this.queryResultsOverlaySelected = new Overlay(this.map());
    this.queryResultsOverlayFocused.setLayerOlStyle(
      LayerQueryResultsOlStyleFunction(this.map().viewController, 'focus')
    );

    this.queryResultsOverlaySelected.setLayerOlStyle(
      LayerQueryResultsOlStyleFunction(this.map().viewController, 'selection')
    );

    this.queryResultsOverlayAll.setLayerOlStyle(
      LayerQueryResultsOlStyleFunction(this.map().viewController)
    );

    this.store.entities$.subscribe((entities) => {
      this.initialized = true;
      this.handleShowAllResults(entities);
    });
    this.monitorResultOutOfView();

    this.storageChange$$ = this.storageService.storageChange$
      .pipe(
        skipWhile(
          (storageChange: StorageServiceEvent) =>
            storageChange.key !== 'zoomAuto'
        )
      )
      .subscribe((change) => {
        this.zoomAuto = change.currentValue;
      });

    this.loadActions();
  }

  private loadActions() {
    this.actionStore.load([
      {
        id: 'list',
        title: this.languageService.translate.instant('toastPanel.backToList'),
        icon: 'list',
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
        icon: 'zoom_in',
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
              featureProjection: this.map().projection
            }
          );
          moveToOlFeatures(
            this.map().viewController,
            localOlFeature,
            FeatureMotion.Zoom
          );
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
        icon: 'frame_inspect',
        availability: () => {
          return this.multiple;
        },
        handler: () => {
          const olFeatures = [];
          for (const result of this.store.all()) {
            const localOlFeature = this.format.readFeature(result.data, {
              dataProjection: result.data.projection,
              featureProjection: this.map().projection
            });
            olFeatures.push(localOlFeature);
          }
          moveToOlFeatures(
            this.map().viewController,
            olFeatures,
            FeatureMotion.Zoom
          );
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
            this.onResultSelect(this.resultSelected$.getValue());
          }
        }
      },
      {
        id: 'fullExtent',
        title: this.languageService.translate.instant('toastPanel.fullExtent'),
        tooltip: this.languageService.translate.instant(
          'toastPanel.fullExtentTooltip'
        ),
        icon: 'open_in_full',
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
        icon: 'close_fullscreen',
        display: () => {
          return this.fullExtent$.pipe(map((v) => v && !this.isDesktop()));
        },
        handler: () => {
          this.fullExtent = false;
        }
      }
    ]);
    this.computeFeatureGeoServiceStatus();
    combineLatest([
      this.resultSelected$,
      this.map().layerController.layers$
    ]).subscribe(() => {
      this.computeFeatureGeoServiceStatus();
    });
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

  getTitle(result: SearchResult) {
    return getEntityTitle(result);
  }

  onResultFocus(result: SearchResult<Feature>) {
    if (this.store.state.get(result).selected) {
      this.queryResultsOverlayFocused.clear();
    } else {
      this.addResultToOverlay(
        result,
        this.queryResultsOverlayFocused,
        FeatureMotion.None
      );
    }
  }

  onResultUnfocus(result: SearchResult<Feature>) {
    this.focusedResult$.next(undefined);
    if (!this.store.state.get(result).selected) {
      this.queryResultsOverlayFocused.clear();
    }
  }

  onResultSelect(result: SearchResult<Feature>) {
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

    this.queryResultsOverlayFocused.clear();
    this.queryResultsOverlaySelected.clear();
    this.addResultToOverlay(
      result,
      this.queryResultsOverlaySelected,
      this.zoomAuto ? FeatureMotion.Default : FeatureMotion.None
    );
    this.isResultSelected$.next(true);
    this.initialized = false;
  }

  /**
   * Try to add a feature to the map overlay
   * @param result A search result that could be a feature
   * @param motion A FeatureMotion to trigger when adding the searchresult to the map search overlay
   */
  private addResultToOverlay(
    result: SearchResult,
    overlay: Overlay,
    motion: FeatureMotion = FeatureMotion.Default
  ) {
    if (result.meta.dataType !== FEATURE) {
      return undefined;
    }
    const feature = (result as SearchResult<Feature>).data;

    // Sometimes features have no geometry. It happens with some GetFeatureInfo
    if (!feature.geometry) {
      return;
    }
    overlay.setFeatures([feature], motion);
  }

  unselectResult() {
    this.resultSelected$.next(undefined);
    this.isResultSelected$.next(false);
    this.setHtmlDisplay(false);
    this.store.state.clear();
  }

  handleWksSelection() {
    const entities = this.store.entities$.getValue();
    const layersTitle = [...new Set(entities.map((e) => e.source.title))];
    const workspaces = this.workspaceState.store.entities$.getValue();
    if (workspaces.length) {
      const wksToHandle = workspaces.filter((wks) =>
        layersTitle.includes(wks.title)
      );
      wksToHandle.map((ws) => {
        ws.entityStore.state.updateMany(ws.entityStore.view.all(), {
          selected: false
        });
      });
    }
  }

  clear() {
    this.handleWksSelection();
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
      this.onResultSelect(previousResult);
    }
  }

  nextResult() {
    if (!this.resultSelected$.value) {
      return;
    }
    let i = this.results.indexOf(this.resultSelected$.value);
    const nextResult = this.results[++i];
    if (nextResult) {
      this.onResultSelect(nextResult);
    }
  }

  hasGeoService() {
    return this.getGeoServices().length;
  }

  private getGeoServices(): ExtendedGeoServiceDefinition[] {
    const resultSelected = this.resultSelected$.getValue();
    if (!resultSelected) {
      return [];
    }
    const hasGeoServiceProperties: ExtendedGeoServiceDefinition[] = [];
    const keys = Object.keys(resultSelected.data.properties);
    Object.entries(resultSelected.data.properties).forEach((entry) => {
      const [key, value] = entry;
      const geoService = this.propertyTypeDetectorService.getGeoService(
        value,
        keys
      );
      const extendedGeoService: ExtendedGeoServiceDefinition = Object.assign(
        {},
        geoService,
        { propertyForUrl: undefined }
      );
      if (geoService) {
        extendedGeoService.propertyForUrl = key;
        hasGeoServiceProperties.push(extendedGeoService);
      }
    });
    return hasGeoServiceProperties;
  }

  handleLayer() {
    const layersIds = this.map().layerController.all.map((layer) => layer.id);
    let potententialLayerToAdd = this.potententialLayerToAdd$.getValue();
    if (!potententialLayerToAdd) {
      this.computeFeatureGeoServiceStatus();
    }
    potententialLayerToAdd = this.potententialLayerToAdd$.getValue();

    if (layersIds.includes(potententialLayerToAdd.id)) {
      const layerToRemove = this.map().layerController.getById(
        potententialLayerToAdd.id
      );
      if (layerToRemove) {
        this.map().layerController.remove(layerToRemove);
        this.potententialLayerisAdded$.next(false);
      }
    } else {
      this.layerService
        .createAsyncLayer(potententialLayerToAdd.sourceOptions)
        .subscribe((layer) => {
          this.map().layersAddedByClick$.next([layer]);
          this.map().layerController.add(layer);
          this.potententialLayerisAdded$.next(true);
        });
    }
  }

  private computeFeatureGeoServiceStatus() {
    const resultSelected = this.resultSelected$.getValue();
    if (!resultSelected) {
      return;
    }
    const geoServices = this.getGeoServices();
    if (geoServices.length) {
      const firstGeoService = geoServices[0];
      const so = this.computeSourceOptionsFromProperties(
        resultSelected.data.properties,
        firstGeoService
      );
      const soId = generateIdFromSourceOptions(so.sourceOptions);
      this.potententialLayerToAdd$.next({ id: soId, sourceOptions: so });
      const layersIds = this.map().layerController.all.map((l) => l.id);
      this.potententialLayerisAdded$.next(
        layersIds.includes(soId) ? true : false
      );
    }
  }

  private computeSourceOptionsFromProperties(
    properties: unknown,
    geoService: ExtendedGeoServiceDefinition
  ) {
    const keys = Object.keys(properties);
    const propertiesForLayerName = keys.filter((p) =>
      geoService.propertiesForLayerName.includes(p)
    );
    // providing the the first matching regex;
    const layerName = properties[propertiesForLayerName[0]];
    const url = properties[geoService.propertyForUrl];
    let appliedLayerName = layerName;
    let arcgisLayerName = undefined;
    if (
      ['arcgisrest', 'imagearcgisrest', 'tilearcgisrest'].includes(
        geoService.type
      )
    ) {
      arcgisLayerName = layerName;
      appliedLayerName = undefined;
    }
    const so = ObjectUtils.removeUndefined({
      sourceOptions: {
        type: geoService.type || 'wms',
        url,
        optionsFromCapabilities: true,
        optionsFromApi: true,
        params: {
          LAYERS: appliedLayerName,
          LAYER: arcgisLayerName
        }
      }
    });
    return so;
  }

  zoomTo() {
    const localOlFeature = this.format.readFeature(
      this.resultSelected$.getValue().data,
      {
        dataProjection: this.resultSelected$.getValue().data.projection,
        featureProjection: this.map().projection
      }
    );
    moveToOlFeatures(
      this.map().viewController,
      localOlFeature,
      FeatureMotion.Zoom
    );
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
  }

  enlargeWindows() {
    this.fullExtent = true;
  }
}
