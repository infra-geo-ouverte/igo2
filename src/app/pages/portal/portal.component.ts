import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';

import { Media, MediaService, MediaOrientation } from '@igo2/core';
import {
  ActionbarMode,
  EntityRecord,
  EntityStore,
  getEntityTitle,
  Tool,
  Toolbox
} from '@igo2/common';
import { ContextService, DetailedContext } from '@igo2/context';
import {
  FEATURE,
  Feature,
  featureToSearchResult,
  IgoMap,
  LayerService,
  QuerySearchSource,
  Research,
  SearchResult,
  SearchSource,
  SearchSourceService
} from '@igo2/geo';
import {
  ContextState,
  ToolState,
  MapState,
  SearchState
} from '@igo2/integration';

import { ClientState } from 'src/app/modules/client/client.state';
import { EditionState } from 'src/app/modules/edition/edition.state';

import { SEARCH_TYPES } from 'src/app/modules/search/shared/search.enums';

import {
  Client,
  ClientParcel,
  ClientSchemaElement,
  CLIENT
} from 'src/lib/client';
import { Editor } from 'src/lib/edition';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit, OnDestroy {

  public editor: Editor;
  public searchResult: SearchResult;
  public searchTypes = SEARCH_TYPES;

  public expansionPanelExpanded = false;
  public sidenavOpened = false;
  public spinnerShown = false;

  // True after the initial context is loaded
  private contextLoaded = false;
  private activity$: Subscription;
  private context$$: Subscription;
  private selectedEditor$$: Subscription;
  private searchResults$$: Subscription;
  private focusedSearchResult$$: Subscription;

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

  get editorStore(): EntityStore<Editor> {
    return this.editionState.store;
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
    this.context$$ = this.contextState.context$
      .subscribe((context: DetailedContext) => this.onChangeContext(context));

    this.focusedSearchResult$$ = this.searchStore.stateView
      .firstBy$((record: EntityRecord<SearchResult>) => record.state.focused === true)
      .subscribe((record: EntityRecord<SearchResult>) => {
        const result = record ? record.entity : undefined;
        this.onFocusSearchResult(result);
      });

    this.selectedEditor$$ = this.editorStore.stateView
      .firstBy$((record: EntityRecord<Editor>) => record.state.selected === true)
      .subscribe((record: EntityRecord<Editor>) => {
        const editor = record ? record.entity : undefined;
        this.onSelectEditor(editor);
      });
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.searchResults$$.unsubscribe();
    this.focusedSearchResult$$.unsubscribe();
    this.selectedEditor$$.unsubscribe();
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
    if (term === undefined || term === '') {
      this.onClearSearch();
      return;
    }

    if (this.searchState.searchTypes.indexOf(CLIENT) >= 0) {
      this.onBeforeSearchClient();
    } else {
      this.onBeforeSearch();
    }
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

  private onChangeContext(context: DetailedContext) {
    if (context === undefined) { return; }
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

  private onBeforeSearchClient() {
    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeExpansionPanel();
    } else {
      this.openExpansionPanel();
    }

    this.toolState.toolbox.activateTool('client');
    this.openSidenav();
  }

  private onSearchClient(result: SearchResult<Client>) {
    this.closeToastPanel();
    this.clientState.setClient(result.data);
    this.editionState.setEditor(this.clientState.parcelEditor);
  }

  private onSearchMap(results: SearchResult<Feature>[]) {
    if (results.length > 0) {
      this.onBeforeSearch();
      this.searchStore.state.update(results[0], {selected: true}, true);
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
    this.clientState.clearClient();
  }

  private onSelectEditor(editor: Editor) {
    this.editor = editor;
  }

  private getQuerySearchSource(): SearchSource {
    return this.searchSourceService
      .getSources()
      .find((searchSource: SearchSource) => searchSource instanceof QuerySearchSource);
  }

}
