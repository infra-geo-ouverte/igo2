import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MapBrowserPointerEvent as OlMapBrowserPointerEvent } from 'ol/MapBrowserEvent';

import { Media, MediaService, MediaOrientation, ActivityService } from '@igo2/core';
import {
  ContextService,
  DetailedContext,
  Tool,
  ToolService
} from '@igo2/context';
import { Feature as IgoFeature } from '@igo2/geo';

import { ActionbarMode } from 'src/lib/action';
import {
  Client,
  ClientParcel,
  ClientSchemaElement,
  CLIENT
} from 'src/lib/client';
import { Editor } from 'src/lib/edition';
import { EntityStore, State, getEntityTitle } from 'src/lib/entity';
import {
  FEATURE,
  Feature
} from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';
import { Research, SearchResult, SearchSource, SearchSourceService } from 'src/lib/search';

import { ClientState } from 'src/app/modules/client/client.state';
import { EditionState } from 'src/app/modules/edition/edition.state';
import { MapState } from 'src/app/modules/map/map.state';
import { SearchState } from 'src/app/modules/search/search.state';

import { MapSearchSource } from 'src/app/modules/search/shared/sources';

import {
  controlSlideX,
  controlSlideY,
  mapSlideX,
  mapSlideY
} from './portal.animation';
import { igoFeatureToSearchResult } from '../../../lib/search/shared/search.utils';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss'],
  animations: [controlSlideX(), controlSlideY(), mapSlideX(), mapSlideY()]
})
export class PortalComponent implements OnInit, OnDestroy {

  public editor: Editor;
  public feature: Feature;

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

  get tool$(): Observable<Tool> {
    return this.toolService.selectedTool$;
  }

  get toastPanelContent(): string {
    let content;
    if (this.editor !== undefined && this.editor.hasWidget) {
      content = 'editor';
    } else if (this.feature !== undefined) {
      content = 'feature';
    }
    return content;
  }

  get toastPanelTitle(): string {
    let title;
    if (this.toastPanelContent === 'feature') {
      title = getEntityTitle(this.feature);
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
    private contextService: ContextService,
    private mediaService: MediaService,
    private searchState: SearchState,
    private toolService: ToolService,
    private activityService: ActivityService,
    private searchSourceService: SearchSourceService
  ) {}

  ngOnInit() {
    window['IGO'] = this;

    this.activity$ = this.activityService.counter$
      .pipe(
        debounceTime(50)
      ).subscribe((count: number) => this.spinnerShown = count > 0);

    this.context$$ = this.contextService.context$
      .subscribe((context: DetailedContext) => this.onChangeContext(context));

    this.focusedSearchResult$$ = this.searchStore
      .observeFirstBy((result: SearchResult, state: State) => state.focused === true)
      .subscribe((result: SearchResult) => this.onFocusSearchResult(result));

    this.selectedEditor$$ = this.editorStore
      .observeFirstBy((editor: Editor, state: State) => state.selected === true)
      .subscribe((editor: Editor) => this.onSelectEditor(editor));
  }

  ngOnDestroy() {
    this.activity$.unsubscribe();
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

  onMapQuery(event: {features: IgoFeature[], event: OlMapBrowserPointerEvent}) {
    const mapSearchSource = this.getMapSearchSource();
    const results = event.features.map((igoFeature: IgoFeature) => {
      igoFeature.geometry = undefined;
      igoFeature.extent = undefined;
      return igoFeatureToSearchResult(igoFeature, mapSearchSource);
    });
    const research = {
      request: of(results),
      reverse: false,
      source: mapSearchSource
    };
    research.request.subscribe((_results: SearchResult<Feature>[]) => {
      this.onSearch({research, results: _results});
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

    this.toolService.setTools(context.tools);

    if (this.contextLoaded) {
      const mapDetails = this.toolService.getTool('mapDetails');
      this.toolService.selectTool(mapDetails);
    }

    this.contextLoaded = true;
  }

  private onBeforeSearch() {
    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeToastPanel();
    }

    const tool = this.toolService.getTool('searchResultsFadq');
    this.toolService.selectTool(tool);
    this.openSidenav();
  }

  private onSearch(event: {research: Research, results: SearchResult[]}) {
    const results = event.results;
    if (results.length === 0) {
      this.onSearchWithNoResults();
      return;
    }

    const newResults = this.searchStore.entities
      .filter((result: SearchResult) => result.source !== event.research.source)
      .concat(results.filter((result: SearchResult) => result.meta.dataType !== CLIENT));
    this.searchStore.setEntities(newResults, true);

    const clientResult = results.find((result: SearchResult) => result.meta.dataType === CLIENT);
    if (clientResult !== undefined) {
      this.onSearchClient(clientResult as SearchResult<Client>);
    }

    const mapSearchSource = this.getMapSearchSource();
    const mapResults = results.filter((result: SearchResult) => result.source === mapSearchSource);
    if (mapResults.length > 0) {
      this.onSearchMap(mapResults as SearchResult<Feature>[]);
    }
  }

  private onBeforeSearchClient() {
    this.closeToastPanel();

    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeExpansionPanel();
    } else {
      this.openExpansionPanel();
    }

    const tool = this.toolService.getTool('client');
    this.toolService.selectTool(tool);

    this.openSidenav();
  }

  private onSearchClient(result: SearchResult<Client>) {
    this.editionState.setEditor(this.clientState.parcelEditor);
  }

  private onSearchMap(results: SearchResult<Feature>[]) {
    if (results.length > 0) {
      this.onBeforeSearch();
      this.searchStore.updateEntityState(results[0], {selected: true}, true);
    }
  }

  private onFocusSearchResult(result: SearchResult) {
    if (result === undefined) {
      return;
    }

    if (result.meta.dataType === FEATURE) {
      if (this.mediaService.media$.value === Media.Mobile) {
        this.closeSidenav();
      }

      this.feature = result.data as Feature;
      this.openToastPanel();
    } else {
      this.feature = undefined;
    }
  }

  private onSearchWithNoResults() {
    this.searchStore.clear();
    this.feature = undefined;
    this.closeToastPanel();
  }

  private onClearSearch() {
    this.onSearchWithNoResults();
    this.clientState.clearClient();
  }

  private onSelectEditor(editor: Editor) {
    this.editor = editor;
  }

  private getMapSearchSource(): SearchSource {
    return this.searchSourceService
      .getSources()
      .find((searchSource: SearchSource) => searchSource instanceof MapSearchSource);
  }

}
