import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';

import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';
import * as olProj from 'ol/proj';

import { MediaService, Media, MediaOrientation } from '@igo2/core';
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
import { DetailedContext } from '@igo2/context';
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
  public expansionPanelExpanded = false;
  public hasExpansionPanel = true;
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

  // True after the initial tool is loaded
  // private toolLoaded = false;

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

  isLandscape(): boolean {
    return this.mediaService.getOrientation() === MediaOrientation.Landscape;
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
    private searchService: SearchService
  ) {}

  ngOnInit() {
    window['IGO'] = this;

    // this.sidenavTitle = this.configService.getConfig('sidenavTitle');

    this.route.queryParams.subscribe(params => {
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
    });

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

    // this.focusedSearchResult$$ = this.searchStore.stateView
    //   .firstBy$(
    //     (record: EntityRecord<SearchResult>) => record.state.focused === true
    //   )
    //   .subscribe((record: EntityRecord<SearchResult>) => {
    //     const result = record ? record.entity : undefined;
    //     this.onFocusSearchResult(result);
    //   });

    // this.route.queryParams.pipe(debounceTime(500)).subscribe(params => {
    //   if (params['sidenav'] === '1') {
    //     this.openSidenav();
    //   }
    // });

    this.tableStore.load([
      { id: '2', name: 'Name 2', description: 'Description 2' },
      { id: '1', name: 'Name 1', description: 'Description 1' },
      { id: '3', name: 'Name 3', description: 'Description 3' },
      { id: '4', name: 'Name 4', description: 'Description 4' },
      { id: '5', name: 'Name 5', description: 'Description 5' }
    ]);
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

    if (this.contextLoaded) {
      this.toolbox.activateTool('mapDetails');
    }

    this.contextLoaded = true;
  }

  private onBeforeSearch() {
    // if (this.mediaService.media$.value === Media.Mobile) {
    //   this.closeToastPanel();
    // }

    this.toolbox.activateTool('searchResults');
    this.openSidenav();
  }

  // private onSearchMap(results: SearchResult<Feature>[]) {
  // if (results.length > 0) {
  //   this.onBeforeSearch();
  //   this.searchStore.state.update(results[0], { selected: true }, true);
  // }
  // }

  // private onFocusSearchResult(result: SearchResult) {
  // if (result === undefined) {
  //   this.closeToastPanel();
  //   this.searchResult = undefined;
  //   return;
  // }
  //
  // if (result.meta.dataType === FEATURE) {
  //   if (this.mediaService.media$.value === Media.Mobile) {
  //     this.closeSidenav();
  //   }
  //
  //   this.searchResult = result;
  //   this.openToastPanel();
  // } else {
  //   this.searchResult = undefined;
  // }
  // }

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
    this.searchBarTerm = coord.join(', ');
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

  removeMapBrowserClass(e) {
    e.element.classList.remove('expansion-offset');
    e.element.classList.remove('sidenav-offset');
  }

  updateMapBrowserClass(e) {
    if (this.expansionPanelExpanded) {
      e.element.classList.add('expansion-offset');
    }

    if (this.sidenavOpened) {
      e.element.classList.add('sidenav-offset');
    }
  }

  getExpansionStatus() {
    if (this.sidenavOpened === false) {
      return 'full';
    }
    if (this.sidenavOpened === true && this.isMobile() === false) {
      return 'reduced';
    }
    if (this.sidenavOpened === true && this.isMobile() === true) {
      if (this.expansionPanelExpanded === true) {
        return 'mobile';
      } else {
        return 'notVisible';
      }
    }
  }

  // private handleContextChange(context: Context) {
  //   if (context !== undefined && this.contextLoaded) {
  //     const tool = this.toolService.getTool("mapDetails");
  //     this.toolService.selectTool(tool);
  //   }
  //
  //   if (context !== undefined) {
  //     this.contextLoaded = true;
  //   }
  //
  //   this.route.queryParams.subscribe(params => {
  //     if (params["layers"] && params["wmsUrl"]) {
  //       const layers = params["layers"].split(",");
  //       layers.forEach(layer => {
  //         this.addLayerByName(params["wmsUrl"], layer);
  //       });
  //     }
  //     if (params["tool"] && !this.toolLoaded) {
  //       const toolNameToOpen = params["tool"];
  //       if (this.toolService.allowedToolName.indexOf(toolNameToOpen) !== -1) {
  //         const tool = this.toolService.getTool(toolNameToOpen);
  //         setTimeout(() => {
  //           this.toolService.selectTool(tool);
  //         }, 250); // add delay for translationservice to be injected
  //       }
  //       this.toolLoaded = true;
  //     }
  //   });
  // }

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
      .subscribe(l => this.map.addLayer(l));
  }
}
