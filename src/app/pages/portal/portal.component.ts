import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, of, BehaviorSubject } from 'rxjs';
import { debounceTime, take, pairwise } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';
import * as olProj from 'ol/proj';

import {
  MediaService,
  Media,
  MediaOrientation,
  ConfigService,
  LanguageService,
  MessageService,
  StorageService,
  StorageScope
} from '@igo2/core';
import {
  ActionbarMode,
  Workspace,
  WorkspaceStore,
  ActionStore,
  EntityStore,
  // getEntityTitle,
  Toolbox,
  Tool,
  EntityTableScrollBehavior,
  Widget
} from '@igo2/common';
import { AuthService } from '@igo2/auth';
import { DetailedContext } from '@igo2/context';
import {
  DataSourceService,
  Feature,
  featureToSearchResult,
  GoogleLinks,
  IgoMap,
  LayerService,
  QuerySearchSource,
  Research,
  SearchResult,
  SearchSource,
  SearchService,
  SearchSourceService,
  CapabilitiesService,
  sourceCanSearch,
  sourceCanReverseSearch,
  generateWMSIdFromSourceOptions,
  generateWMTSIdFromSourceOptions,
  WMSDataSourceOptions,
  WMTSDataSourceOptions,
  FEATURE,
  ImportService,
  handleFileImportError,
  handleFileImportSuccess,
  ExportOptions,
  featureFromOl,
  QueryService
} from '@igo2/geo';

import {
  ToolState,
  MapState,
  SearchState,
  QueryState,
  ContextState,
  WorkspaceState,
  ImportExportState
} from '@igo2/integration';

import {
  expansionPanelAnimation,
  toastPanelAnimation,
  baselayersAnimation,
  controlsAnimations,
  controlSlideX,
  controlSlideY,
  mapSlideX,
  mapSlideY
} from './portal.animation';
import { HttpClient } from '@angular/common/http';

import { WelcomeWindowComponent } from './welcome-window/welcome-window.component';
import { WelcomeWindowService } from './welcome-window/welcome-window.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  animations: [
    expansionPanelAnimation(),
    toastPanelAnimation(),
    baselayersAnimation(),
    controlsAnimations(),
    controlSlideX(),
    controlSlideY(),
    mapSlideX(),
    mapSlideY()
  ]
})
export class PortalComponent implements OnInit, OnDestroy {
  public minSearchTermLength = 2;
  public hasExpansionPanel = false;
  public hasFeatureEmphasisOnSelection: Boolean = false;
  public workspacePaginator: MatPaginator;
  public workspaceEntitySortChange$: BehaviorSubject<
    boolean
  > = new BehaviorSubject(false);

  public fullExtent;
  public sidenavOpened = false;
  public searchBarTerm = '';
  public onSettingsChange$ = new BehaviorSubject<boolean>(undefined);
  public termDefinedInUrl = false;
  private addedLayers$$: Subscription[] = [];
  public forceCoordsNA = false;

  public contextMenuStore = new ActionStore([]);
  private contextMenuCoord: [number, number];

  private contextLoaded = false;

  private context$$: Subscription;
  private openSidenav$$: Subscription;

  public igoSearchPointerSummaryEnabled = false;

  public toastPanelForExpansionOpened = true;
  private activeWidget$$: Subscription;
  public showToastPanelForExpansionToggle = false;
  public selectedWorkspace$: BehaviorSubject<Workspace> = new BehaviorSubject(
    undefined
  );

  @ViewChild('mapBrowser', { read: ElementRef, static: true })
  mapBrowser: ElementRef;
  @ViewChild('searchBar', { read: ElementRef, static: true })
  searchBar: ElementRef;

  get map(): IgoMap {
    return this.mapState.map;
  }

  isMobile(): boolean {
    return this.mediaService.getMedia() === Media.Mobile;
  }

  isTablet(): boolean {
    return this.mediaService.getMedia() === Media.Tablet;
  }

  isLandscape(): boolean {
    return this.mediaService.getOrientation() === MediaOrientation.Landscape;
  }

  isPortrait(): boolean {
    return this.mediaService.getOrientation() === MediaOrientation.Portrait;
  }

  get backdropShown(): boolean {
    return (
      (this.isMobile() || (this.isTablet() && this.isPortrait())) &&
      this.sidenavOpened
    );
  }

  get expansionPanelExpanded(): boolean {
    return this.workspaceState.workspacePanelExpanded;
  }
  set expansionPanelExpanded(value: boolean) {
    this.workspaceState.workspacePanelExpanded = value;
  }

  get toastPanelShown(): boolean {
    return true;
  }

  get expansionPanelBackdropShown(): boolean {
    return this.expansionPanelExpanded && this.toastPanelForExpansionOpened;
  }

  get actionbarMode(): ActionbarMode {
    return ActionbarMode.Overlay;
  }

  get actionbarWithTitle(): boolean {
    return this.actionbarMode === ActionbarMode.Overlay;
  }

  get searchStore(): EntityStore<SearchResult> {
    return this.searchState.store;
  }

  get queryStore(): EntityStore<SearchResult> {
    return this.queryState.store;
  }

  get toolbox(): Toolbox {
    return this.toolState.toolbox;
  }

  get toastPanelContent(): string {
    let content;
    if (this.workspace !== undefined && this.workspace.hasWidget) {
      content = 'workspace';
    } /*else if (this.searchResult !== undefined) {
      content = this.searchResult.meta.dataType.toLowerCase();
    }*/
    return content;
  }

  // get toastPanelTitle(): string {
  //   let title;
  //   if (
  //     this.toastPanelContent !== 'workspace' &&
  //     this.searchResult !== undefined
  //   ) {
  //     title = getEntityTitle(this.searchResult);
  //   }
  //   return title;
  // }

  get toastPanelOpened(): boolean {
    return this.storageService.get('toastOpened') as boolean;
  }

  set toastPanelOpened(value: boolean) {
    if (value === this.storageService.get('toastOpened')) {
      return;
    }
    this.storageService.set('toastOpened', value, StorageScope.SESSION);
  }

  get workspaceStore(): WorkspaceStore {
    return this.workspaceState.store;
  }

  get workspace(): Workspace {
    return this.workspaceState.workspace$.value;
  }

  constructor(
    private route: ActivatedRoute,
    public workspaceState: WorkspaceState,
    public authService: AuthService,
    public mediaService: MediaService,
    public layerService: LayerService,
    public dataSourceService: DataSourceService,
    public cdRef: ChangeDetectorRef,
    public capabilitiesService: CapabilitiesService,
    private contextState: ContextState,
    private mapState: MapState,
    private searchState: SearchState,
    private queryState: QueryState,
    private toolState: ToolState,
    private searchSourceService: SearchSourceService,
    private configService: ConfigService,
    private importService: ImportService,
    private importExportState: ImportExportState,
    private http: HttpClient,
    private languageService: LanguageService,
    private messageService: MessageService,
    private welcomeWindowService: WelcomeWindowService,
    public dialogWindow: MatDialog,
    private queryService: QueryService,
    private storageService: StorageService
  ) {
    this.hasExpansionPanel = this.configService.getConfig('hasExpansionPanel');
    this.forceCoordsNA = this.configService.getConfig('app.forceCoordsNA');
    this.hasFeatureEmphasisOnSelection = this.configService.getConfig(
      'hasFeatureEmphasisOnSelection'
    );
    this.igoSearchPointerSummaryEnabled = this.configService.getConfig(
      'hasSearchPointerSummary'
    );
  }

  ngOnInit() {
    window['IGO'] = this;

    this.initWelcomeWindow();

    this.authService.authenticate$.subscribe((authenticated) => {
      this.contextLoaded = false;
    });

    this.context$$ = this.contextState.context$.subscribe(
      (context: DetailedContext) => this.onChangeContext(context)
    );

    this.contextMenuStore.load([
      {
        id: 'coordinates',
        title: 'coordinates',
        handler: () => this.searchCoordinate(this.contextMenuCoord)
      },
      {
        id: 'googleMaps',
        title: 'googleMap',
        handler: () => this.openGoogleMaps(this.contextMenuCoord)
      },
      {
        id: 'googleStreetView',
        title: 'googleStreetView',
        handler: () => this.openGoogleStreetView(this.contextMenuCoord)
      }
    ]);

    this.queryStore.count$
      .pipe(pairwise())
      .subscribe(([prevCnt, currentCnt]) => {
        this.map.viewController.padding[2] = currentCnt ? 280 : 0;
        // on mobile. Close the toast if workspace is opened, on new query
        if (
          prevCnt === 0 &&
          currentCnt !== prevCnt &&
          this.isMobile() &&
          this.hasExpansionPanel &&
          this.expansionPanelExpanded &&
          this.toastPanelOpened
        ) {
          this.toastPanelOpened = false;
        }
      });
    this.readQueryParams();

    this.onSettingsChange$.subscribe(() => {
      this.searchState.setSearchSettingsChange();
    });

    this.workspaceState.workspaceEnabled$.next(this.hasExpansionPanel);
    this.workspaceState.store.empty$.subscribe((workspaceEmpty) => {
      if (!this.hasExpansionPanel) {
        return;
      }
      this.workspaceState.workspaceEnabled$.next(workspaceEmpty ? false : true);
      if (workspaceEmpty) {
        this.expansionPanelExpanded = false;
      }
      this.updateMapBrowserClass();
    });

    this.workspaceState.workspace$.subscribe((activeWks) => {
      if (activeWks) {
        this.selectedWorkspace$.next(activeWks);
        this.expansionPanelExpanded = true;
      } else {
        this.expansionPanelExpanded = false;
      }
    });

    this.activeWidget$$ = this.workspaceState.activeWorkspaceWidget$.subscribe(
      (widget: Widget) => {
        if (widget !== undefined) {
          this.openToastPanelForExpansion();
          this.showToastPanelForExpansionToggle = true;
        } else {
          this.closeToastPanelForExpansion();
          this.showToastPanelForExpansionToggle = false;
        }
      }
    );

    this.openSidenav$$ = this.toolState.openSidenav$.subscribe(
      (openSidenav: boolean) => {
        if (openSidenav) {
          this.openSidenav();
          this.toolState.openSidenav$.next(false);
        }
      }
    );
  }

  paginatorChange(matPaginator: MatPaginator) {
    this.workspacePaginator = matPaginator;
  }

  entitySortChange() {
    this.workspaceEntitySortChange$.next(true);
  }

  entitySelectChange(result: { added: Feature[] }) {
    const baseQuerySearchSource = this.getQuerySearchSource();
    const querySearchSourceArray: QuerySearchSource[] = [];
    if (result && result.added) {
      const results = result.added.map((res) => {
        if (
          res &&
          res.ol &&
          res.ol.getProperties()._featureStore.layer &&
          res.ol.getProperties()._featureStore.layer.visible
        ) {
          const featureStoreLayer = res.ol.getProperties()._featureStore.layer;
          const feature = featureFromOl(
            res.ol,
            featureStoreLayer.map.projection,
            featureStoreLayer.ol
          );

          feature.meta.alias = this.queryService.getAllowedFieldsAndAlias(
            featureStoreLayer
          );
          feature.meta.title =
            this.queryService.getQueryTitle(feature, featureStoreLayer) ||
            feature.meta.title;
          let querySearchSource = querySearchSourceArray.find(
            (s) => s.title === feature.meta.sourceTitle
          );
          if (!querySearchSource) {
            querySearchSource = new QuerySearchSource({
              title: feature.meta.sourceTitle
            });
            querySearchSourceArray.push(querySearchSource);
          }
          return featureToSearchResult(feature, querySearchSource);
        }
      });

      const research = {
        request: of(results),
        reverse: false,
        source: baseQuerySearchSource
      };
      research.request.subscribe((queryResults: SearchResult<Feature>[]) => {
        this.queryStore.load(queryResults);
      });
    }
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.activeWidget$$.unsubscribe();
    this.openSidenav$$.unsubscribe();
  }

  /**
   * Cancel ongoing add layer, if any
   */
  private cancelOngoingAddLayer() {
    this.addedLayers$$.forEach((sub: Subscription) => sub.unsubscribe());
    this.addedLayers$$ = [];
  }

  onBackdropClick() {
    this.closeSidenav();
  }

  onToggleSidenavClick() {
    this.toggleSidenav();
  }

  onDeactivateWorkspaceWidget() {
    this.closeToastPanelForExpansion();
  }

  closeToastPanelForExpansion() {
    this.toastPanelForExpansionOpened = false;
  }

  openToastPanelForExpansion() {
    this.toastPanelForExpansionOpened = true;
  }

  onMapQuery(event: { features: Feature[]; event: OlMapBrowserPointerEvent }) {
    const baseQuerySearchSource = this.getQuerySearchSource();
    const querySearchSourceArray: QuerySearchSource[] = [];

    const results = event.features.map((feature: Feature) => {
      let querySearchSource = querySearchSourceArray.find(
        (s) => s.title === feature.meta.sourceTitle
      );
      if (!querySearchSource) {
        querySearchSource = new QuerySearchSource({
          title: feature.meta.sourceTitle
        });
        querySearchSourceArray.push(querySearchSource);
      }
      return featureToSearchResult(feature, querySearchSource);
    });

    const research = {
      request: of(results),
      reverse: false,
      source: baseQuerySearchSource
    };
    research.request.subscribe((queryResults: SearchResult<Feature>[]) => {
      this.queryStore.load(queryResults);
    });
  }

  onSearchTermChange(term?: string) {
    this.searchState.setSearchTerm(term);
    const termWithoutHashtag = term.replace(/(#[^\s]*)/g, '').trim();
    if (termWithoutHashtag.length < 2) {
      this.onClearSearch();
      return;
    }
    this.onBeforeSearch();
  }

  onSearch(event: { research: Research; results: SearchResult[] }) {
    const results = event.results;

    const isReverseSearch = !sourceCanSearch(event.research.source);

    let enabledSources;
    if (isReverseSearch) {
      enabledSources = this.searchSourceService
        .getEnabledSources()
        .filter(sourceCanReverseSearch);
    } else {
      enabledSources = this.searchSourceService
        .getEnabledSources()
        .filter(sourceCanSearch);
    }

    const newResults = this.searchStore.entities$.value
      .filter(
        (result: SearchResult) =>
          result.source !== event.research.source &&
          enabledSources.includes(result.source)
      )
      .concat(results);
    this.searchStore.load(newResults);
  }

  onSearchSettingsChange() {
    this.onSettingsChange$.next(true);
  }

  private closeSidenav() {
    this.sidenavOpened = false;
    this.map.viewController.padding[3] = 0;
  }

  private openSidenav() {
    this.sidenavOpened = true;
    this.map.viewController.padding[3] = this.isMobile() ? 0 : 400;
  }

  private toggleSidenav() {
    this.sidenavOpened ? this.closeSidenav() : this.openSidenav();
  }

  public toolChanged(tool: Tool) {
    if (tool && tool.name === 'searchResults') {
      this.searchBar.nativeElement.getElementsByTagName('input')[0].focus();
    }
  }

  private onChangeContext(context: DetailedContext) {
    this.cancelOngoingAddLayer();
    if (context === undefined) {
      return;
    }

    this.route.queryParams.pipe(debounceTime(250)).subscribe((params) => {
      if (!params['context'] || params['context'] === context.uri) {
        this.readLayersQueryParams(params);
      }
    });

    if (this.contextLoaded) {
      const contextManager = this.toolbox.getTool('contextManager');
      const contextManagerOptions = contextManager
        ? contextManager.options
        : {};
      let toolToOpen = contextManagerOptions.toolToOpenOnContextChange;

      if (!toolToOpen) {
        const toolOrderToOpen = ['mapTools', 'map', 'mapDetails', 'mapLegend'];
        for (const toolName of toolOrderToOpen) {
          if (this.toolbox.getTool(toolName)) {
            toolToOpen = toolName;
            break;
          }
        }
      }

      if (toolToOpen) {
        this.toolbox.activateTool(toolToOpen);
      }
    }

    this.contextLoaded = true;
  }

  private onBeforeSearch() {
    if (
      !this.toolbox.activeTool$.value ||
      this.toolbox.activeTool$.value.name !== 'searchResults'
    ) {
      this.toolbox.activateTool('searchResults');
    }
    this.openSidenav();
  }

  toastOpenedChange(opened: boolean) {
    this.map.viewController.padding[2] = opened ? 280 : 0;
    this.handleExpansionAndToastOnMobile();
  }

  private handleExpansionAndToastOnMobile() {
    if (
      this.isMobile() &&
      this.hasExpansionPanel &&
      this.expansionPanelExpanded &&
      this.toastPanelOpened
    ) {
      this.expansionPanelExpanded = false;
    }
  }

  public onClearSearch() {
    this.map.overlay.removeFeatures(
      this.searchStore
        .all()
        .filter((f) => f.meta.dataType === FEATURE)
        .map((f) => f.data as Feature)
    );
    this.searchStore.clear();
  }

  private getQuerySearchSource(): SearchSource {
    return this.searchSourceService
      .getSources()
      .find(
        (searchSource: SearchSource) =>
          searchSource instanceof QuerySearchSource
      );
  }

  onContextMenuOpen(event: { x: number; y: number }) {
    this.contextMenuCoord = this.getClickCoordinate(event);
  }

  private getClickCoordinate(event: { x: number; y: number }) {
    const contextmenuPoint = event;
    const boundingMapBrowser = this.mapBrowser.nativeElement.getBoundingClientRect();
    contextmenuPoint.y =
      contextmenuPoint.y -
      boundingMapBrowser.top +
      (window.scrollY || window.pageYOffset);
    contextmenuPoint.x =
      contextmenuPoint.x -
      boundingMapBrowser.left +
      (window.scrollX || window.pageXOffset);
    const pixel = [contextmenuPoint.x, contextmenuPoint.y];

    const coord = this.map.ol.getCoordinateFromPixel(pixel);
    const proj = this.map.projection;
    return olProj.transform(coord, proj, 'EPSG:4326');
  }

  private openGoogleMaps(coord: [number, number]) {
    window.open(GoogleLinks.getGoogleMapsCoordLink(coord[0], coord[1]));
  }

  private openGoogleStreetView(coord: [number, number]) {
    window.open(GoogleLinks.getGoogleStreetViewLink(coord[0], coord[1]));
  }

  searchCoordinate(coord: [number, number]) {
    this.searchBarTerm = coord.map((c) => c.toFixed(6)).join(', ');
  }

  updateMapBrowserClass() {
    const header = this.queryState.store.entities$.value.length > 0;
    if (this.hasExpansionPanel && this.workspaceState.workspaceEnabled$.value) {
      this.mapBrowser.nativeElement.classList.add('has-expansion-panel');
    } else {
      this.mapBrowser.nativeElement.classList.remove('has-expansion-panel');
    }

    if (this.hasExpansionPanel && this.expansionPanelExpanded) {
      this.mapBrowser.nativeElement.classList.add('expansion-offset');
    } else {
      this.mapBrowser.nativeElement.classList.remove('expansion-offset');
    }

    if (this.sidenavOpened) {
      this.mapBrowser.nativeElement.classList.add('sidenav-offset');
    } else {
      this.mapBrowser.nativeElement.classList.remove('sidenav-offset');
    }

    if (this.sidenavOpened && !this.isMobile()) {
      this.mapBrowser.nativeElement.classList.add('sidenav-offset-baselayers');
    } else {
      this.mapBrowser.nativeElement.classList.remove(
        'sidenav-offset-baselayers'
      );
    }

    if (!this.toastPanelOpened && header && !this.expansionPanelExpanded) {
      this.mapBrowser.nativeElement.classList.add('toast-offset-scale-line');
    } else {
      this.mapBrowser.nativeElement.classList.remove('toast-offset-scale-line');
    }

    if (
      !this.toastPanelOpened &&
      header &&
      (this.isMobile() || this.isTablet() || this.sidenavOpened) &&
      !this.expansionPanelExpanded
    ) {
      this.mapBrowser.nativeElement.classList.add('toast-offset-attribution');
    } else {
      this.mapBrowser.nativeElement.classList.remove(
        'toast-offset-attribution'
      );
    }
  }

  getExtent() {
    if (!this.sidenavOpened) {
      if (this.fullExtent) {
        return 'fullStandard';
      } else {
        return 'standard';
      }
    } else if (this.sidenavOpened) {
      if (this.fullExtent) {
        return 'fullOffsetX';
      } else {
        return 'standardOffsetX';
      }
    }
  }

  onPointerSummaryStatusChange(value) {
    this.igoSearchPointerSummaryEnabled = value;
  }

  getExpansionPanelStatus() {
    if (this.sidenavOpened === false) {
      if (this.expansionPanelExpanded === true) {
        return 'full';
      }
      return 'notTriggered';
    }
    if (this.sidenavOpened === true && this.isMobile() === false) {
      if (this.expansionPanelExpanded === true) {
        return 'reduced';
      }
      return 'reducedNotTriggered';
    }
    if (this.sidenavOpened === true && this.isMobile() === true) {
      if (this.expansionPanelExpanded === true) {
        return 'mobile';
      } else {
        return 'notVisible';
      }
    }
  }

  getExpansionToastPanelStatus() {
    if (this.expansionPanelExpanded === true) {
      if (this.toastPanelOpened === true) {
        return 'down';
      }
      if (this.toastPanelOpened === false) {
        if (this.queryState.store.entities$.value.length > 0) {
          return 'down';
        }
        return 'up';
      }
      return 'up';
    }
    if (this.expansionPanelExpanded === false) {
      if (this.toastPanelOpened === true) {
        return 'down';
      }
      if (this.toastPanelOpened === false) {
        if (this.queryState.store.entities$.value.length > 0) {
          return 'up';
        }
        return 'down';
      }
      return 'down';
    }
  }

  getToastPanelOffsetY() {
    let status = 'noExpansion';
    if (this.expansionPanelExpanded) {
      if (this.toastPanelOpened) {
        status = 'expansionAndToastOpened';
      } else {
        status = 'expansionAndToastClosed';
      }
    } else {
      status = 'noExpansion';
    }
    return status;
  }

  getToastPanelStatus() {
    if (this.isMobile() === true && this.toastPanelOpened === false) {
      if (this.sidenavOpened === false) {
        if (this.expansionPanelExpanded === false) {
          if (this.queryState.store.entities$.value.length > 0) {
            return 'low';
          }
        }
      }
    }
  }

  getBaselayersSwitcherStatus() {
    if (this.isMobile()) {
      if (this.hasExpansionPanel === true) {
        if (this.toastPanelOpened === false) {
          if (this.expansionPanelExpanded === false) {
            if (this.queryState.store.entities$.value.length > 0) {
              return 'up';
            }
            return 'down';
          }
          return 'down';
        }
        return 'down';
      }
      if (this.hasExpansionPanel === false) {
        if (this.toastPanelOpened === false) {
          if (this.queryState.store.entities$.value.length > 0) {
            return 'down';
          }
        }
      }
    }
  }

  private readQueryParams() {
    this.route.queryParams.pipe(debounceTime(250)).subscribe((params) => {
      this.readToolParams(params);
      this.readSearchParams(params);
      this.readFocusFirst(params);
    });
  }

  private computeFocusFirst() {
    setTimeout(() => {
      const resultItem: any = document
        .getElementsByTagName('igo-search-results-item')
        .item(0);
      if (resultItem) {
        resultItem.click();
      }
    }, 1);
  }

  private readFocusFirst(params: Params) {
    if (params['sf'] === '1' && this.termDefinedInUrl) {
      const entities$$ = this.searchStore.entities$
        .pipe(debounceTime(500), take(1))
        .subscribe((entities) => {
          entities$$.unsubscribe();
          if (entities.length) {
            this.computeFocusFirst();
          }
        });
    }
  }

  private readSearchParams(params: Params) {
    if (params['search']) {
      this.termDefinedInUrl = true;
      this.searchBarTerm = params['search'];
    }
  }

  private readToolParams(params: Params) {
    if (params['tool']) {
      this.toolbox.activateTool(params['tool']);
    }

    if (params['sidenav'] === '1') {
      setTimeout(() => {
        this.openSidenav();
      }, 250);
    }
  }

  private readLayersQueryParams(params: Params) {
    this.readLayersQueryParamsWMS(params);
    this.readLayersQueryParamsWMTS(params);
    this.readVectorQueryParams(params);
  }

  private readLayersQueryParamsWMS(params: Params) {
    if ((params['layers'] || params['wmsLayers']) && params['wmsUrl']) {
      const nameParamLayers = params['wmsLayers'] ? 'wmsLayers' : 'layers'; // for maintain compatibility
      const layersByService = params[nameParamLayers].split('),(');
      const urls = params['wmsUrl'].split(',');
      let cnt = 0;
      urls.forEach((url) => {
        const currentLayersByService = this.extractLayersByService(
          layersByService[cnt]
        );
        currentLayersByService.forEach((layer) => {
          const layerFromUrl = layer.split(':igoz');
          const layerOptions = {
            url: url,
            params: { LAYERS: layerFromUrl[0] }
          };
          const id = generateWMSIdFromSourceOptions(
            layerOptions as WMSDataSourceOptions
          );
          const visibility = this.computeLayerVisibilityFromUrl(params, id);
          this.addWmsLayerByName(
            url,
            layerFromUrl[0],
            visibility,
            parseInt(layerFromUrl[1] || 1000, 10)
          );
        });
        cnt += 1;
      });
    }
  }

  private readLayersQueryParamsWMTS(params: Params) {
    if (params['wmtsLayers'] && params['wmtsUrl']) {
      const layersByService = params['wmtsLayers'].split('),(');
      const urls = params['wmtsUrl'].split(',');
      let cnt = 0;
      urls.forEach((url) => {
        const currentLayersByService = this.extractLayersByService(
          layersByService[cnt]
        );
        currentLayersByService.forEach((layer) => {
          const layerFromUrl = layer.split(':igoz');
          const layerOptions = {
            url: url,
            layer: layerFromUrl[0]
          };
          const id = generateWMTSIdFromSourceOptions(
            layerOptions as WMTSDataSourceOptions
          );
          const visibility = this.computeLayerVisibilityFromUrl(params, id);
          this.addWmtsLayerByName(
            url,
            layerFromUrl[0],
            visibility,
            parseInt(layerFromUrl[1] || 1000, 10)
          );
        });
        cnt += 1;
      });
    }
  }

  private readVectorQueryParams(params: Params) {
    if (params['vector']) {
      const url = params['vector'] as string;
      const lastIndex = url.lastIndexOf('/');
      const fileName = url.slice(lastIndex + 1, url.length);

      this.http.get(`${url}`, { responseType: 'blob' }).subscribe((data) => {
        const file = new File([data], fileName, {
          type: data.type,
          lastModified: Date.now()
        });
        this.importService.import(file).subscribe(
          (features: Feature[]) => this.onFileImportSuccess(file, features),
          (error: Error) => this.onFileImportError(file, error)
        );
      });
    }
  }

  private onFileImportSuccess(file: File, features: Feature[]) {
    handleFileImportSuccess(
      file,
      features,
      this.map,
      this.messageService,
      this.languageService
    );
  }

  private onFileImportError(file: File, error: Error) {
    handleFileImportError(
      file,
      error,
      this.messageService,
      this.languageService
    );
  }

  private extractLayersByService(layersByService: string): any[] {
    let outLayersByService = layersByService;
    outLayersByService = outLayersByService.startsWith('(')
      ? outLayersByService.substr(1)
      : outLayersByService;
    outLayersByService = outLayersByService.endsWith(')')
      ? outLayersByService.slice(0, -1)
      : outLayersByService;
    return outLayersByService.split(',');
  }

  private addWmsLayerByName(
    url: string,
    name: string,
    visibility: boolean = true,
    zIndex: number = 100000
  ) {
    if (!this.contextLoaded) {
      return;
    }
    this.addedLayers$$.push(
      this.layerService
        .createAsyncLayer({
          zIndex: zIndex,
          visible: visibility,
          sourceOptions: {
            optionsFromCapabilities: true,
            type: 'wms',
            url: url,
            params: {
              layers: name,
              version: '1.3.0'
            }
          }
        })
        .subscribe((l) => {
          this.map.addLayer(l);
        })
    );
  }

  private addWmtsLayerByName(
    url: string,
    name: string,
    visibility: boolean = true,
    zIndex: number = 100000
  ) {
    if (!this.contextLoaded) {
      return;
    }
    this.addedLayers$$.push(
      this.layerService
        .createAsyncLayer({
          zIndex: zIndex,
          visible: visibility,
          sourceOptions: {
            optionsFromCapabilities: true,
            type: 'wmts',
            url: url,
            crossOrigin: true,
            // matrixSet: 'GoogleMapsCompatibleExt2:epsg:3857',
            version: '1.0.0',
            layer: name
          }
        } as any)
        .subscribe((l) => {
          this.map.addLayer(l);
        })
    );
  }

  private computeLayerVisibilityFromUrl(
    params: Params,
    currentLayerid: string
  ): boolean {
    const queryParams = params;
    let visible = true;
    if (!queryParams || !currentLayerid) {
      return visible;
    }
    let visibleOnLayersParams = '';
    let visibleOffLayersParams = '';
    let visiblelayers: string[] = [];
    let invisiblelayers: string[] = [];
    if (queryParams['visiblelayers']) {
      visibleOnLayersParams = queryParams['visiblelayers'];
    }
    if (queryParams['invisiblelayers']) {
      visibleOffLayersParams = queryParams['invisiblelayers'];
    }

    /* This order is important because to control whichever
     the order of * param. First whe open and close everything.*/
    if (visibleOnLayersParams === '*') {
      visible = true;
    }
    if (visibleOffLayersParams === '*') {
      visible = false;
    }

    // After, managing named layer by id (context.json OR id from datasource)
    visiblelayers = visibleOnLayersParams.split(',');
    invisiblelayers = visibleOffLayersParams.split(',');
    if (visiblelayers.indexOf(currentLayerid) > -1) {
      visible = true;
    }
    if (invisiblelayers.indexOf(currentLayerid) > -1) {
      visible = false;
    }
    return visible;
  }

  private initWelcomeWindow(): void {
    const authConfig = this.configService.getConfig('auth');
    if (authConfig) {
      this.authService.logged$.subscribe((logged) => {
        if (logged) {
          this.createWelcomeWindow();
        }
      });
    } else {
      this.createWelcomeWindow();
    }
  }

  private createWelcomeWindow(): void {
    if (this.welcomeWindowService.hasWelcomeWindow()) {
      const welcomWindowConfig: MatDialogConfig = this.welcomeWindowService.getConfig();

      const dialogRef = this.dialogWindow.open(
        WelcomeWindowComponent,
        welcomWindowConfig
      );

      dialogRef.afterClosed().subscribe((result) => {
        this.welcomeWindowService.afterClosedWelcomeWindow();
      });
    }
  }
}
