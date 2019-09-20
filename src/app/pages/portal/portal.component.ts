import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';
import * as olProj from 'ol/proj';

import {
  MediaService,
  Media,
  MediaOrientation,
  ConfigService
} from '@igo2/core';
import {
  // ActionbarMode,
  // Workspace,
  // WorkspaceStore,
  // EntityRecord,
  ActionStore,
  EntityStore,
  // getEntityTitle,
  Toolbox,
  Tool
} from '@igo2/common';
import { AuthService } from '@igo2/auth';
import { DetailedContext, Context } from '@igo2/context';
import {
  DataSourceService,
  Feature,
  // FEATURE,
  FeatureMotion,
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
  CapabilitiesService
} from '@igo2/geo';

import {
  ToolState,
  MapState,
  SearchState,
  QueryState,
  ContextState
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
  public expansionPanelExpanded = false;
  public toastPanelOpened = true;
  public sidenavOpened = false;
  public searchBarTerm = '';

  public contextMenuStore = new ActionStore([]);
  private contextMenuCoord: [number, number];

  private contextLoaded = false;

  // public searchResult: SearchResult;
  // public queryResults: SearchResult[];

  private context$$: Subscription;
  private searchResults$$: Subscription;
  private focusedSearchResult$$: Subscription;

  public tableStore = new EntityStore([]);
  public tableTemplate = {
    selection: true,
    sort: true,
    columns: [
      {
        name: 'id',
        title: 'ID'
      },
      {
        name: 'name',
        title: 'Name'
      },
      {
        name: 'description',
        title: 'Description'
      }
    ]
  };

  @ViewChild('mapBrowser', { read: ElementRef }) mapBrowser: ElementRef;
  @ViewChild('searchBar', { read: ElementRef }) searchBar: ElementRef;

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
      this.mediaService.media$.value === Media.Mobile && this.sidenavOpened
    );
  }

  get toastPanelShown(): boolean {
    return true;
    // return (
    //   this.mediaService.media$.value === Media.Mobile && !this.sidenavOpened
    // );
  }

  get expansionPanelBackdropShown(): boolean {
    return false;
    // return (
    //   this.expansionPanelExpanded &&
    //   this.toastPanelOpened &&
    //   this.mediaService.media$.value !== Media.Mobile
    // );
  }

  // get actionbarMode(): ActionbarMode {
  //   if (this.mediaService.media$.value === Media.Mobile) {
  //     return ActionbarMode.Overlay;
  //   }
  //   return this.expansionPanelExpanded
  //     ? ActionbarMode.Dock
  //     : ActionbarMode.Overlay;
  // }
  //
  // get actionbarWithTitle(): boolean {
  //   return this.actionbarMode === ActionbarMode.Overlay;
  // }

  get searchStore(): EntityStore<SearchResult> {
    return this.searchState.store;
  }

  get queryStore(): EntityStore<SearchResult> {
    return this.queryState.store;
  }

  get toolbox(): Toolbox {
    return this.toolState.toolbox;
  }

  // get toastPanelContent(): string {
  //   let content;
  //   if (this.workspace !== undefined && this.workspace.hasWidget) {
  //     content = 'workspace';
  //   } else if (this.searchResult !== undefined) {
  //     content = this.searchResult.meta.dataType.toLowerCase();
  //   }
  //   return content;
  // }

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

  // get toastPanelOpened(): boolean {
  //   const content = this.toastPanelContent;
  //   if (content === 'workspace') {
  //     return true;
  //   }
  //   return this._toastPanelOpened;
  // }
  // set toastPanelOpened(value: boolean) {
  //   this._toastPanelOpened = value;
  // }
  // private _toastPanelOpened = false;

  // get workspaceStore(): WorkspaceStore {
  //   return this.workspaceState.store;
  // }
  //
  // get workspace(): Workspace {
  //   return this.workspaceState.workspace$.value;
  // }

  constructor(
    private route: ActivatedRoute,
    // private workspaceState: WorkspaceState,
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
    private searchService: SearchService,
    private configService: ConfigService
  ) {
    this.hasExpansionPanel = this.configService.getConfig('hasExpansionPanel');
  }

  ngOnInit() {
    window['IGO'] = this;

    this.authService.authenticate$.subscribe(
      () => (this.contextLoaded = false)
    );

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

    this.tableStore.load([
      { id: '2', name: 'Name 2', description: 'Description 2' },
      { id: '1', name: 'Name 1', description: 'Description 1' },
      { id: '3', name: 'Name 3', description: 'Description 3' },
      { id: '4', name: 'Name 4', description: 'Description 4' },
      { id: '5', name: 'Name 5', description: 'Description 5' }
    ]);

    this.readQueryParams();
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.searchResults$$.unsubscribe();
    this.focusedSearchResult$$.unsubscribe();
  }

  onBackdropClick() {
    this.closeSidenav();
  }

  onToggleSidenavClick() {
    this.toggleSidenav();
  }

  onMapQuery(event: { features: Feature[]; event: OlMapBrowserPointerEvent }) {
    const baseQuerySearchSource = this.getQuerySearchSource();
    const querySearchSourceArray: QuerySearchSource[] = [];

    const results = event.features.map((feature: Feature) => {
      let querySearchSource = querySearchSourceArray.find(
        s => s.title === feature.meta.sourceTitle
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
    if (term === undefined || term === '') {
      this.onClearSearch();
      return;
    }
    this.onBeforeSearch();
  }

  onSearch(event: { research: Research; results: SearchResult[] }) {
    const results = event.results;

    // TODO: add property in searchSource
    const reverseSearch =
      event.research.source.getId().indexOf('reverse') !== -1;
    const enabledSources = this.searchSourceService
      .getEnabledSources()
      .filter(s => (s.getId().indexOf('reverse') !== -1) === reverseSearch);

    const newResults = this.searchStore.entities$.value
      .filter(
        (result: SearchResult) =>
          result.source !== event.research.source &&
          enabledSources.includes(result.source)
      )
      .concat(results);
    this.searchStore.load(newResults);
  }

  private closeSidenav() {
    this.sidenavOpened = false;
  }

  private openSidenav() {
    this.sidenavOpened = true;
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
    if (context === undefined) {
      return;
    }

    this.route.queryParams.pipe(debounceTime(250)).subscribe(params => {
      if (params['context'] === context.uri) {
        this.readLayersQueryParams(params);
      }
    });

    if (this.contextLoaded) {
      this.toolbox.activateTool('mapDetails');
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
    this.toastPanelOpened = opened;
  }

  addFeatureToMap(result: SearchResult<Feature>) {
    const feature = result ? result.data : undefined;

    // Somethimes features have no geometry. It happens with some GetFeatureInfo
    if (!feature || feature.geometry === undefined) {
      this.map.overlay.clear();
      return;
    }

    this.map.overlay.setFeatures([feature], FeatureMotion.Default);
  }

  public onClearSearch() {
    this.searchStore.clear();
    this.map.overlay.clear();
    // this.closeToastPanel();
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
      contextmenuPoint.y - boundingMapBrowser.top + window.scrollY;
    contextmenuPoint.x =
      contextmenuPoint.x - boundingMapBrowser.left + window.scrollX;
    const pixel = [contextmenuPoint.x, contextmenuPoint.y];

    const coord = this.map.ol.getCoordinateFromPixel(pixel);
    const proj = this.map.projection;
    return olProj.transform(coord, proj, 'EPSG:4326');
  }

  private openGoogleMaps(coord: [number, number]) {
    window.open(GoogleLinks.getGoogleMapsLink(coord[0], coord[1]));
  }

  private openGoogleStreetView(coord: [number, number]) {
    window.open(GoogleLinks.getGoogleStreetViewLink(coord[0], coord[1]));
  }

  private searchCoordinate(coord: [number, number]) {
    this.searchBarTerm = coord.map(c => c.toFixed(6)).join(', ');
    const results = this.searchService.reverseSearch(coord);

    this.onBeforeSearch();
    for (const i in results) {
      if (!results[i]) {
        continue;
      }
      results[i].request.subscribe((_results: SearchResult<Feature>[]) => {
        this.onSearch({ research: results[i], results: _results });
      });
    }
  }

  updateMapBrowserClass(e) {
    const header = this.queryState.store.entities$.value.length > 0;
    if (this.hasExpansionPanel) {
      e.element.classList.add('has-expansion-panel');
    } else {
      e.element.classList.remove('has-expansion-panel');
    }

    if (this.expansionPanelExpanded) {
      e.element.classList.add('expansion-offset');
    } else {
      e.element.classList.remove('expansion-offset');
    }

    if (this.sidenavOpened) {
      e.element.classList.add('sidenav-offset');
    } else {
      e.element.classList.remove('sidenav-offset');
    }

    if (this.sidenavOpened && !this.isMobile()) {
      e.element.classList.add('sidenav-offset-baselayers');
    } else {
      e.element.classList.remove('sidenav-offset-baselayers');
    }

    if (!this.toastPanelOpened && header && !this.expansionPanelExpanded) {
      e.element.classList.add('toast-offset-scale-line');
    } else {
      e.element.classList.remove('toast-offset-scale-line');
    }

    if (
      !this.toastPanelOpened &&
      header &&
      (this.isMobile() || this.isTablet() || this.sidenavOpened) &&
      !this.expansionPanelExpanded
    ) {
      e.element.classList.add('toast-offset-attribution');
    } else {
      e.element.classList.remove('toast-offset-attribution');
    }
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
    this.route.queryParams.pipe(debounceTime(250)).subscribe(params => {
      this.readLayersQueryParams(params);
      this.readToolParams(params);
      this.readSearchParams(params);
    });
  }

  private readSearchParams(params: Params) {
    if (params['search']) {
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
    if (params['layers'] && params['wmsUrl']) {
      const layersByService = params['layers'].split('),(');
      const urls = params['wmsUrl'].split(',');
      let cnt = 0;
      urls.forEach(url => {
        let currentLayersByService = layersByService[cnt];
        currentLayersByService = currentLayersByService.startsWith('(')
          ? currentLayersByService.substr(1)
          : currentLayersByService;
        currentLayersByService = currentLayersByService.endsWith(')')
          ? currentLayersByService.slice(0, -1)
          : currentLayersByService;
        currentLayersByService = currentLayersByService.split(',');
        currentLayersByService.forEach(layer => {
          const layerFromUrl = layer.split(':igoz');
          this.addLayerByName(
            url,
            layerFromUrl[0],
            parseInt(layerFromUrl[1] || 1000, 10)
          );
        });
        cnt += 1;
      });
    }
  }

  private addLayerByName(url: string, name: string, zIndex: number = 100000) {
    this.layerService
      .createAsyncLayer({
        zIndex: zIndex,
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
      .subscribe(l => {
        this.map.addLayer(l);
      });
  }
}
