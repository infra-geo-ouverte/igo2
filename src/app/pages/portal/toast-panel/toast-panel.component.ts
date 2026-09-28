import { AsyncPipe, NgClass, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnDestroy,
  OnInit,
  effect,
  inject,
  input,
  model,
  output,
  signal
} from '@angular/core';
import {
  takeUntilDestroyed,
  toObservable,
  toSignal
} from '@angular/core/rxjs-interop';
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
  IgoMap,
  Overlay,
  OverlayService,
  SearchResult,
  SearchResultsComponent,
  computeOlFeaturesExtent,
  featureToOl,
  featuresAreOutOfView,
  moveToOlFeatures,
  styleVariant
} from '@igo2/geo';
import { QueryState, StorageState, WorkspaceState } from '@igo2/integration';

import olFormatGeoJSON from 'ol/format/GeoJSON';

import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { debounceTime, map, skipWhile, switchMap } from 'rxjs/operators';

import { GeoServiceLayerButtonComponent } from './geo-service-layer-button/geo-service-layer-button.component';

@Component({
  selector: 'app-toast-panel',
  templateUrl: './toast-panel.component.html',
  styleUrls: ['./toast-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ActionbarComponent,
    AsyncPipe,
    FeatureDetailsComponent,
    GeoServiceLayerButtonComponent,
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
  ],
  host: {
    '[style.visibility]': 'this.getHostDisplayStyle()',
    '(document:keydown.escape)': 'this.clear()',
    '(document:keydown.backspace)': 'this.unselectResult()',
    '(document:keydown.z)': 'this.onZoomHandler()'
  }
})
export class ToastPanelComponent implements OnInit, OnDestroy {
  mediaService = inject(MediaService);
  overlayService = inject(OverlayService);
  languageService = inject(LanguageService);
  destroyRef = inject(DestroyRef);
  cdr = inject(ChangeDetectorRef);
  private storageState = inject(StorageState);
  private queryState = inject(QueryState);
  private workspaceState = inject(WorkspaceState);
  private configService = inject(ConfigService);

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

  store = input.required<EntityStore<SearchResult<Feature>>>();

  opened = model(this.getDefaultOpened());

  zoomAuto = signal(!!this.storageService.get('zoomAuto'));

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

  public withZoomButton = true;
  zoomAuto$ = new BehaviorSubject<boolean>(false);

  readonly fullExtentEvent = output<boolean>();
  readonly windowHtmlDisplayEvent = output<boolean>();

  selection = signal<SearchResult<Feature>>(undefined);
  selection$ = toObservable(this.selection);

  readonly results = toSignal(
    toObservable(this.store).pipe(switchMap((store) => store.entities$)),
    { initialValue: [] }
  );

  get multiple(): Observable<boolean> {
    this.results().length
      ? this.multiple$.next(true)
      : this.multiple$.next(false);
    return this.multiple$;
  }

  constructor() {
    this.tabsMode = this.configService.getConfig('queryTabs', false);
    this.fullExtent = this.storageService.get('fullExtent') as boolean;

    effect(() => {
      this.storageService.set(
        'toastOpened',
        this.opened(),
        StorageScope.SESSION
      );
    });

    effect(() => {
      this.storageService.set('zoomAuto', this.zoomAuto());
    });
  }

  ngOnInit() {
    const map = this.map();
    const viewController = map.viewController;
    this.queryResultsOverlayAll = this.overlayService.create(
      map,
      this.queryState.queryOverlayStyle?.base ?? styleVariant(viewController)
    );
    this.queryResultsOverlayFocused = this.overlayService.create(
      map,
      this.queryState.queryOverlayStyle?.focus ??
        styleVariant(viewController, 'focus')
    );
    this.queryResultsOverlaySelected = this.overlayService.create(
      map,
      this.queryState.queryOverlayStyle?.selection ??
        styleVariant(map.viewController, 'selection')
    );

    this.store()
      .entities$.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((entities) => {
        this.handleShowAllResults(entities);

        const selection = this.selection();
        if (selection && !entities.includes(selection)) {
          this.unselectResult();
        }

        this.cdr.markForCheck();
      });

    this.monitorResultOutOfView();

    this.storageChange$$ = this.storageService.storageChange$
      .pipe(
        skipWhile(
          (storageChange: StorageServiceEvent) =>
            storageChange.key !== 'zoomAuto'
        ),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((change) => {
        this.zoomAuto.set(!!change.currentValue as boolean);
      });

    this.actionStore.load(this.getActionLoadConfig());
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

  onZoomHandler() {
    if (this.isResultSelected$.getValue() === true) {
      const localOlFeature = this.format.readFeature(this.selection().data, {
        dataProjection: this.selection().data.projection,
        featureProjection: this.map().projectionCode
      });
      moveToOlFeatures(
        this.map().viewController,
        localOlFeature,
        FeatureMotion.Default
      );
    }
  }

  getHostDisplayStyle() {
    return this.results().length ? 'visible' : 'hidden';
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
        this.selection() &&
        this.isHtmlDisplay,

      'app-toast-panel-html-large':
        this.opened &&
        this.fullExtent &&
        this.selection() &&
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
    if (this.selection() || !this.opened) {
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

  getTitle(result: SearchResult) {
    return getEntityTitle(result);
  }

  onResultFocus(result: SearchResult<Feature>) {
    if (this.store().state.get(result).selected) {
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
    if (!this.store().state.get(result).selected) {
      this.queryResultsOverlayFocused.clear();
    }
  }

  onResultSelect(result: SearchResult<Feature>) {
    this.store().state.update(
      result,
      {
        focused: true,
        selected: true
      },
      true
    );
    this.selection.set(result);
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
      this.zoomAuto() ? FeatureMotion.Default : FeatureMotion.None
    );
    this.isResultSelected$.next(true);
  }

  unselectResult() {
    this.selection.set(undefined);
    this.isResultSelected$.next(false);
    this.setHtmlDisplay(false);
    this.store().state.clear();
  }

  clear() {
    this.handleWksSelection();
    this.store().state.clear();
    this.store().clear();
    this.unselectResult();
    this.setHtmlDisplay(false);
  }

  isMobile(): boolean {
    return this.mediaService.getMedia() === Media.Mobile;
  }
  isDesktop(): boolean {
    return this.mediaService.isDesktop();
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 37) {
      this.previousResult();
    } else if (event.keyCode === 39) {
      this.nextResult();
    }
  }

  previousResult() {
    if (!this.selection()) {
      return;
    }
    const results = this.results();
    const previousResult = results[results.indexOf(this.selection()) - 1];
    if (previousResult) {
      this.onResultSelect(previousResult);
    }
  }

  nextResult() {
    if (!this.selection()) {
      return;
    }
    const results = this.results();
    const nextResult = results[results.indexOf(this.selection()) + 1];
    if (nextResult) {
      this.onResultSelect(nextResult);
    }
  }

  private handleShowAllResults(searchResults: SearchResult<Feature>[]) {
    this.clearOverlays();

    const rec = searchResults
      .filter((sr) => sr.meta.dataType === FEATURE)
      .map((sr) => sr.data as Feature);
    if (rec?.length) {
      this.queryResultsOverlayAll.setFeatures(rec, FeatureMotion.None);
    }
  }

  private clearOverlays() {
    this.queryResultsOverlayAll.clear();
    this.queryResultsOverlayFocused.clear();
    this.queryResultsOverlaySelected.clear();
  }

  private monitorResultOutOfView() {
    this.isSelectedResultOutOfView$$ = combineLatest([
      this.map().viewController.state$,
      this.selection$
    ])
      .pipe(debounceTime(100), takeUntilDestroyed(this.destroyRef))
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
          featuresAreOutOfView(
            this.map().viewController.getExtent(),
            selectedOlFeatureExtent
          )
        );
      });
  }

  private handleWksSelection() {
    const entities = this.store().entities$.getValue();
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

  private getActionLoadConfig(): Action[] {
    const { instant: translateInstant } = this.languageService.translate;
    return [
      {
        id: 'list',
        title: translateInstant('toastPanel.backToList'),
        icon: 'list',
        tooltip: translateInstant('toastPanel.listButton'),
        display: () => {
          return this.isResultSelected$;
        },
        handler: () => {
          this.unselectResult();
        }
      },
      {
        id: 'zoomFeature',
        title: translateInstant('toastPanel.zoomOnFeature'),
        icon: 'zoom_in',
        tooltip: translateInstant('toastPanel.zoomOnFeatureTooltip'),
        display: () => {
          return this.isResultSelected$;
        },
        handler: () => {
          const { projectionCode, viewController } = this.map();
          const localOlFeature = this.format.readFeature(
            this.selection().data,
            {
              dataProjection: this.selection().data.projection,
              featureProjection: projectionCode
            }
          );
          moveToOlFeatures(viewController, localOlFeature, FeatureMotion.Zoom);
        }
      },
      {
        id: 'zoomResults',
        title: translateInstant('toastPanel.zoomOnFeatures'),
        tooltip: translateInstant('toastPanel.zoomOnFeaturesTooltip'),
        icon: 'frame_inspect',
        availability: () => {
          return this.multiple;
        },
        handler: () => {
          const { projectionCode, viewController } = this.map();
          const olFeatures = [];
          for (const result of this.store().all()) {
            const localOlFeature = this.format.readFeature(result.data, {
              dataProjection: result.data.projection,
              featureProjection: projectionCode
            });
            olFeatures.push(localOlFeature);
          }
          moveToOlFeatures(viewController, olFeatures, FeatureMotion.Zoom);
        }
      },
      {
        id: 'zoomAuto',
        title: translateInstant('toastPanel.zoomAuto'),
        tooltip: translateInstant('toastPanel.zoomAutoTooltip'),
        checkbox: true,
        checkCondition: this.zoomAuto(),
        handler: () => {
          this.zoomAuto.set(!this.zoomAuto());
          if (this.zoomAuto() && this.isResultSelected$.value === true) {
            this.onResultSelect(this.selection());
          }
        }
      },
      {
        id: 'fullExtent',
        title: translateInstant('toastPanel.fullExtent'),
        tooltip: translateInstant('toastPanel.fullExtentTooltip'),
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
        title: translateInstant('toastPanel.standardExtent'),
        tooltip: translateInstant('toastPanel.standardExtentTooltip'),
        icon: 'close_fullscreen',
        display: () => {
          return this.fullExtent$.pipe(map((v) => v && !this.isDesktop()));
        },
        handler: () => {
          this.fullExtent = false;
        }
      }
    ];
  }

  private getDefaultOpened() {
    const value = this.storageService.get('toastOpened') as boolean;
    return value !== undefined ? value : true; // Default to true if not set in storage
  }

  zoomTo() {
    const localOlFeature = this.format.readFeature(this.selection().data, {
      dataProjection: this.selection().data.projection,
      featureProjection: this.map().projectionCode
    });
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
      this.opened.set(true);
    } else if (action === ToastPanelComponent.SWIPE_ACTION.DOWN) {
      this.opened.set(false);
    }
  }

  onToggleClick(e: MouseEvent) {
    if ((e.target as any).className !== 'igo-panel-title') {
      return;
    }
    this.opened.set(!this.opened());
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
