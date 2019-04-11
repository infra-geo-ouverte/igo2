import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, of } from 'rxjs';

import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';

import { Media, MediaService, MediaOrientation } from '@igo2/core';
import {
  ActionbarMode,
  Editor,
  EditorStore,
  EntityRecord,
  EntityStore,
  getEntityTitle
} from '@igo2/common';
import {
  FEATURE,
  Feature,
  featureToSearchResult,
  IgoMap,
  QuerySearchSource,
  Research,
  SearchResult,
  SearchSource,
  SearchSourceService
} from '@igo2/geo';
import {
  ContextState,
  EditionState,
  ToolState,
  MapState,
  SearchState
} from '@igo2/integration';

import { SEARCH_TYPES } from 'src/app/modules/search/shared/search.enums';
import { ClientState } from 'src/app/modules/client/client.state';
import { ClientSearchSource } from 'src/app/modules/search/shared/sources/client';

import {
  Client,
  ClientParcel,
  ClientSchemaElement,
  CLIENT
} from 'src/lib/client';

import { CADASTRE } from 'src/lib/cadastre';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {

  public searchResult: SearchResult;
  public searchTypes = SEARCH_TYPES;
  public minSearchTermLength = 2;

  public expansionPanelExpanded = false;
  public sidenavOpened = false;

  public searchbarDisabled: boolean = false;

  private focusedSearchResult$$: Subscription;
  private currentSearchTerm: string;
  private currentSearchType: string = CLIENT;

  get map(): IgoMap {
    return this.mapState.map;
  }

  get backdropShown(): boolean {
    return this.mediaService.media$.value === Media.Mobile && this.sidenavOpened;
  }

  get expansionPanelBackdropShown(): boolean {
    return this.expansionPanelExpanded && this.toastPanelOpened;
  }

  get mapActionbarMode(): ActionbarMode {
    const media = this.mediaService.media$.value;
    const orientation = this.mediaService.orientation$.value;
    if (media === Media.Desktop && orientation === MediaOrientation.Landscape) {
      return ActionbarMode.Dock;
    }
    return ActionbarMode.Overlay;
  }

  get mapActionbarWithTitle(): boolean {
    return this.mapActionbarMode === ActionbarMode.Overlay;
  }

  get actionbarMode(): ActionbarMode {
    return this.expansionPanelExpanded ? ActionbarMode.Dock : ActionbarMode.Overlay;
  }

  get actionbarWithTitle(): boolean {
    return this.actionbarMode === ActionbarMode.Overlay;
  }

  get parcelStore(): EntityStore<ClientParcel> {
    return this.clientState.parcelStore;
  }

  get schemaElementStore(): EntityStore<ClientSchemaElement> {
    return this.clientState.schemaElementStore;
  }

  get searchStore(): EntityStore<SearchResult> {
    return this.searchState.store;
  }

  get editorStore(): EditorStore {
    return this.editionState.store;
  }

  get editor(): Editor {
    return this.editionState.editor$.value;
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
    if (this.toastPanelContent !== 'editor' && this.searchResult !== undefined) {
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

  constructor(
    private mapState: MapState,
    private clientState: ClientState,
    private editionState: EditionState,
    private contextState: ContextState,
    private searchState: SearchState,
    private toolState: ToolState,
    private mediaService: MediaService,
    private searchSourceService: SearchSourceService
  ) {}

  ngOnInit() {
    this.focusedSearchResult$$ = this.searchStore.stateView
      .firstBy$((record: EntityRecord<SearchResult>) => record.state.focused === true)
      .subscribe((record: EntityRecord<SearchResult>) => {
        const result = record ? record.entity : undefined;
        this.onFocusSearchResult(result);
      });
  }

  ngOnDestroy() {
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
      // This patch removes the "square overlay. added after a query. IMO,
      // there should be an alternative to that square or no square at all.
      // Check the extractHtmlData of the QueryService for more info.
      feature.geometry = undefined;
      feature.extent = undefined;
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
    this.currentSearchTerm = term;
    if (term.length < this.minSearchTermLength) { return; }
    this.onBeforeSearch();
  }

  onSearchTypeChange(type?: string) {
    this.currentSearchType = type;
    this.onBeforeSearch();
  }

  onSearch(event: {research: Research, results: SearchResult[]}) {
    const results = event.results;
    const querySearchSource = this.getQuerySearchSource();
    if (results.length === 0 && event.research.source === querySearchSource) {
      if (this.searchResult !== undefined && this.searchResult.source === querySearchSource) {
        this.searchStore.state.update(this.searchResult, {focused: false, selected: false});
        this.closeToastPanel();
      }
      return;
    }

    this.searchStore.state.updateAll({focused: false, selected: false});

    const newResults = this.searchStore.entities$.value
      .filter((result: SearchResult) => result.source !== event.research.source)
      .concat(results.filter((result: SearchResult) => result.meta.dataType !== CLIENT));
    this.searchStore.load(newResults);

    const clientResult = results.find((result: SearchResult) => result.meta.dataType === CLIENT);
    if (clientResult !== undefined) {
      this.onSearchClient(clientResult as SearchResult<Client>);
    } else if (event.research.source instanceof ClientSearchSource) {
      this.onClientNotFound();
    }

    const mapResults = results.filter((result: SearchResult) => result.source === querySearchSource);
    if (mapResults.length > 0) {
      this.onSearchMap(mapResults as SearchResult<Feature>[]);
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

  private verifyNullTerm(): boolean {
    if (this.currentSearchTerm === undefined || this.currentSearchTerm === '') {
      return true;
    }
    return false;
  }

  private onBeforeSearch() {
    switch (this.currentSearchType) {
      case CLIENT: {
        this.onBeforeSearchClient();
        break;
      }
      case CADASTRE: {
        this.onBeforeSearchCadastre();
        break;
      }
      default: {
        this.onBeforeSearchOthers();
        break;
      }
    }
  }

  private onBeforeSearchOthers() {
    this.searchbarDisabled = false;

    if (this.verifyNullTerm()) {
      this.onClearSearch();
      return;
    }

    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeToastPanel();
    }
    this.toolState.toolbox.activateTool('searchResults');
    this.openSidenav();
  }

  private onBeforeSearchClient() {

    this.searchbarDisabled = false;

    if (this.verifyNullTerm()) {
      this.onClearSearch();
      return;
    }

    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeExpansionPanel();
    } else {
      this.openExpansionPanel();
    }

    if (this.currentSearchTerm.length >= 3) {
      this.toolState.toolbox.activateTool('client');
      this.openSidenav();
    }
  }

  private onBeforeSearchCadastre() {
    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeExpansionPanel();
    } else {
      this.openExpansionPanel();
    }
    this.searchbarDisabled = true;
    this.toolState.toolbox.activateTool('cadastre');
    this.openSidenav();
  }

  private onSearchClient(result: SearchResult<Client>) {
    this.closeToastPanel();
    this.clientState.setClient(result.data);
  }

  private onClientNotFound() {
    this.clientState.setClientNotFound();
  }

  private onSearchMap(results: SearchResult<Feature>[]) {
    if (results.length === 0) { return; }
    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeToastPanel();
    }
    this.toolState.toolbox.activateTool('searchResults');
    this.openSidenav();
    this.searchStore.state.update(results[0], {selected: true}, true);
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
      // open the toast panel only if the focus comes from the map
      const querySearchSource = this.getQuerySearchSource();
      if (querySearchSource !== undefined && result.source === querySearchSource) {
        this.openToastPanel();
      }

    } else {
      this.searchResult = undefined;
    }
  }

  private onClearSearch() {
    this.searchStore.clear();
    this.closeToastPanel();
    this.clientState.clearClient();
  }

  private getQuerySearchSource(): SearchSource {
    return this.searchSourceService
      .getSources()
      .find((searchSource: SearchSource) => searchSource instanceof QuerySearchSource);
  }

}
