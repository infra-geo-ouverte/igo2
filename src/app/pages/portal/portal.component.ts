import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';

import { MediaService, ConfigService, Media } from '@igo2/core';
import {
  ActionbarMode,
  Editor,
  EditorStore,
  EntityRecord,
  EntityStore,
  getEntityTitle,
  Toolbox
} from '@igo2/common';
import { AuthService } from '@igo2/auth';
import { DetailedContext } from '@igo2/context';
import {
  DataSourceService,
  Feature,
  FEATURE,
  featureToSearchResult,
  IgoMap,
  LayerService,
  QuerySearchSource,
  Research,
  SearchResult,
  SearchSource,
  SearchSourceService,
  CapabilitiesService
} from '@igo2/geo';

import {
  ContextState,
  EditionState,
  ToolState,
  MapState,
  SearchState
} from '@igo2/integration';

import {
  controlSlideX,
  controlSlideY,
  mapSlideX,
  mapSlideY
} from './portal.animation';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  animations: [controlSlideX(), controlSlideY(), mapSlideX(), mapSlideY()]
})
export class PortalComponent implements OnInit, OnDestroy {
  static SWIPE_ACTION = {
    RIGHT: 'swiperight',
    LEFT: 'swipeleft'
  };

  public searchResult: SearchResult;
  public minSearchTermLength = 2;

  public expansionPanelExpanded = false;
  public sidenavOpened = false;

  // True after the initial context is loaded
  private contextLoaded = false;
  private context$$: Subscription;
  private searchResults$$: Subscription;
  private focusedSearchResult$$: Subscription;

  public sidenavTitle;

  // True after the initial tool is loaded
  private toolLoaded = false;

  get map(): IgoMap {
    return this.mapState.map;
  }

  get backdropShown(): boolean {
    return (
      this.mediaService.media$.value === Media.Mobile && this.sidenavOpened
    );
  }

  get expansionPanelBackdropShown(): boolean {
    return this.expansionPanelExpanded && this.toastPanelOpened;
  }

  get actionbarMode(): ActionbarMode {
    return this.expansionPanelExpanded
      ? ActionbarMode.Dock
      : ActionbarMode.Overlay;
  }

  get actionbarWithTitle(): boolean {
    return this.actionbarMode === ActionbarMode.Overlay;
  }

  get searchStore(): EntityStore<SearchResult> {
    return this.searchState.store;
  }

  get toolbox(): Toolbox {
    return this.toolState.toolbox;
  }

  get toastPanelContent(): string {
    let content;
    if (this.editor !== undefined && this.editor.hasWidget) {
      content = 'editor';
    } else if (this.searchResult !== undefined) {
      content = this.searchResult.meta.dataType.toLowerCase();
    }
    return content;
  }

  get toastPanelTitle(): string {
    let title;
    if (
      this.toastPanelContent !== 'editor' &&
      this.searchResult !== undefined
    ) {
      title = getEntityTitle(this.searchResult);
    }
    return title;
  }

  get toastPanelOpened(): boolean {
    const content = this.toastPanelContent;
    if (content === 'editor') {
      return true;
    }
    return this._toastPanelOpened;
  }
  set toastPanelOpened(value: boolean) {
    this._toastPanelOpened = value;
  }
  private _toastPanelOpened = false;

  get editorStore(): EditorStore {
    return this.editionState.store;
  }

  get editor(): Editor {
    return this.editionState.editor$.value;
  }

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    private editionState: EditionState,
    public authService: AuthService,
    public mediaService: MediaService,
    public layerService: LayerService,
    public dataSourceService: DataSourceService,
    public cdRef: ChangeDetectorRef,
    public capabilitiesService: CapabilitiesService,
    private contextState: ContextState,
    private mapState: MapState,
    private searchState: SearchState,
    private toolState: ToolState,
    private searchSourceService: SearchSourceService
  ) {}

  ngOnInit() {
    window['IGO'] = this;

    this.sidenavTitle = this.configService.getConfig('sidenavTitle');

    this.authService.authenticate$.subscribe(
      () => (this.contextLoaded = false)
    );

    this.context$$ = this.contextState.context$.subscribe(
      (context: DetailedContext) => this.onChangeContext(context)
    );

    this.focusedSearchResult$$ = this.searchStore.stateView
      .firstBy$(
        (record: EntityRecord<SearchResult>) => record.state.focused === true
      )
      .subscribe((record: EntityRecord<SearchResult>) => {
        const result = record ? record.entity : undefined;
        this.onFocusSearchResult(result);
      });

    this.route.queryParams.pipe(debounceTime(500)).subscribe(params => {
      if (params['sidenav'] === '1') {
        this.openSidenav();
      }
    });
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
    const querySearchSource = this.getQuerySearchSource();
    const results = event.features.map((feature: Feature) => {
      return featureToSearchResult(feature, querySearchSource);
    });
    const research = {
      request: of(results),
      reverse: false,
      source: querySearchSource
    };
    research.request.subscribe((_results: SearchResult<Feature>[]) => {
      this.onSearch({ research, results: _results });
    });
  }

  onSearchTermChange(term?: string) {
    if (term === undefined || term === '') {
      this.onClearSearch();
      return;
    }

    if (term.length < this.minSearchTermLength) {
      return;
    }

    this.onBeforeSearch();
  }

  onSearch(event: { research: Research; results: SearchResult[] }) {
    const results = event.results;
    const querySearchSource = this.getQuerySearchSource();
    if (results.length === 0 && event.research.source === querySearchSource) {
      if (
        this.searchResult !== undefined &&
        this.searchResult.source === querySearchSource
      ) {
        this.searchStore.state.update(this.searchResult, {
          focused: false,
          selected: false
        });
        this.closeToastPanel();
      }
      return;
    }

    this.searchStore.state.updateAll({ focused: false, selected: false });

    const newResults = this.searchStore.entities$.value
      .filter((result: SearchResult) => result.source !== event.research.source)
      .concat(results);
    this.searchStore.load(newResults);

    const queryResults = results.filter(
      (result: SearchResult) => result.source === querySearchSource
    );
    if (queryResults.length > 0) {
      this.onSearchMap(queryResults as SearchResult<Feature>[]);
    }
  }

  onDeactivateEditorWidget() {
    this.closeToastPanel();
  }

  private closeToastPanel() {
    this.toastPanelOpened = false;
  }

  private openToastPanel() {
    this.toastPanelOpened = true;
  }

  private closeExpansionPanel() {
    this.expansionPanelExpanded = false;
  }

  private openExpansionPanel() {
    this.expansionPanelExpanded = true;
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

  private onChangeContext(context: DetailedContext) {
    if (context === undefined) {
      return;
    }

    if (this.contextLoaded) {
      this.toolState.toolbox.activateTool('mapDetails');
    }

    this.contextLoaded = true;
  }

  private onBeforeSearch() {
    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeToastPanel();
    }

    this.toolState.toolbox.activateTool('searchResults');
    this.openSidenav();
  }

  private onSearchMap(results: SearchResult<Feature>[]) {
    if (results.length > 0) {
      this.onBeforeSearch();
      this.searchStore.state.update(results[0], { selected: true }, true);
    }
  }

  private onFocusSearchResult(result: SearchResult) {
    if (result === undefined) {
      this.closeToastPanel();
      this.searchResult = undefined;
      return;
    }

    if (result.meta.dataType === FEATURE) {
      if (this.mediaService.media$.value === Media.Mobile) {
        this.closeSidenav();
      }

      this.searchResult = result;
      this.openToastPanel();
    } else {
      this.searchResult = undefined;
    }
  }

  private onClearSearch() {
    this.searchStore.clear();
    this.closeToastPanel();
  }

  private getQuerySearchSource(): SearchSource {
    return this.searchSourceService
      .getSources()
      .find(
        (searchSource: SearchSource) =>
          searchSource instanceof QuerySearchSource
      );
  }

  removeMapBrowserClass(e) {
    e.element.classList.remove('toast-shown-offset');
    e.element.classList.remove('toast-opened-offset');
    e.element.classList.remove('sidenav-offset');
  }

  updateMapBrowserClass(e) {
    // if (this.mediaService.media$.value === "mobile") {
    //   if (this.toastOpened && this.toastShown) {
    //     e.element.classList.add("toast-opened-offset");
    //     return;
    //   }
    //   if (this.toastShown) {
    //     e.element.classList.add("toast-shown-offset");
    //   }
    //   return;
    // }
    // if (this.sidenavOpened) {
    //   e.element.classList.add("sidenav-offset");
    // }
  }

  swipe(action: string) {
    // const featuresList = this.featureService.features$.value;
    // const focusedFeature = this.featureService.focusedFeature$.value;
    //
    // let index = featuresList.findIndex(f => f.id === focusedFeature.id);
    // if (index < 0) {
    //   return;
    // }
    //
    // if (action === PortalComponent.SWIPE_ACTION.LEFT) {
    //   index += 1;
    // } else if (action === PortalComponent.SWIPE_ACTION.RIGHT) {
    //   index -= 1;
    // }
    //
    // if (featuresList[index]) {
    //   this.featureService.selectFeature(featuresList[index]);
    // }
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

  // private addLayerByName(url: string, name: string) {
  //   const properties = {
  //     type: "wms" as any,
  //     // format: 'wms',
  //     url: url,
  //     params: {
  //       layers: name
  //     }
  //   };
  //
  //   this.capabilitiesService
  //     .getWMSOptions(properties)
  //     .subscribe(capabilities => {
  //       this.dataSourceService
  //         .createAsyncDataSource(capabilities)
  //         .pipe(debounceTime(100))
  //         .subscribe(dataSource => {
  //           const layerOptions = {
  //             source: Object.assign(dataSource, {
  //               options: {
  //                 optionsFromCapabilities: true,
  //                 _layerOptionsFromCapabilities: (capabilities as any)
  //                   ._layerOptionsFromCapabilities
  //               }
  //             })
  //           };
  //           this.map.addLayer(this.layerService.createLayer(layerOptions));
  //         });
  //     });
  // }
}
