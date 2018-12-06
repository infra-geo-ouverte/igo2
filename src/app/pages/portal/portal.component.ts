import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Media, MediaService } from '@igo2/core';
import {
  ContextService,
  DetailedContext,
  Tool,
  ToolService
} from '@igo2/context';
import { VectorLayer } from '@igo2/geo';

import { Client, ClientParcel, CLIENT } from 'src/app/modules/client';
import { createParcelLayer } from 'src/app/modules/client/parcel/shared/client-parcel.utils';
import { Editor } from 'src/app/modules/edition';
import { EntityStore, State, getEntityTitle } from 'src/app/modules/entity';
import { FEATURE, Feature } from 'src/app/modules/feature';
import { EntityLoader } from 'src/app/modules/layer';
import { IgoMap, ProjectionService } from 'src/app/modules/map';
import { SearchResult, ClientSearchSource } from 'src/app/modules/search';
import {
  ClientState,
  EditionState,
  MapState,
  SearchState
} from 'src/app/state';

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

  public map: IgoMap;
  public editor: Editor;
  public feature: Feature;

  public expansionPanelExpanded = false;
  public sidenavOpened = false;

  // True after the initial context is loaded
  private contextLoaded = false;
  private context$$: Subscription;
  private selectedEditor$$: Subscription;
  private searchResults$$: Subscription;
  private focusedSearchResult$$: Subscription;

  private parcelLayer: VectorLayer;
  private parcelLoader: EntityLoader;

  get backdropShown(): boolean {
    return this.mediaService.media$.value === Media.Mobile && this.sidenavOpened;
  }

  get expansionPanelBackdropShown(): boolean {
    return this.expansionPanelExpanded && this.toastPanelOpened;
  }

  get parcelStore(): EntityStore<ClientParcel> {
    return this.clientState.parcelStore;
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
    if (this.editor !== undefined && this.editor.hasComponent) {
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
    if (this.toastPanelContent === 'editor') {
      return true;
    }
    return this._toastPanelOpened;
  }
  set toastPanelOpened(value: boolean) {
    this._toastPanelOpened = value;
  }
  private _toastPanelOpened = false;

  constructor(
    private projectionService: ProjectionService,
    private mapState: MapState,
    private contextService: ContextService,
    private mediaService: MediaService,
    private searchState: SearchState,
    private toolService: ToolService,
    private clientState: ClientState,
    private editionState: EditionState
  ) {}

  ngOnInit() {
    window['IGO'] = this;

    this.map = new IgoMap({
      controls: {
        scaleLine: true,
        attribution: {
          collapsed: false
        }
      }
    });
    this.mapState.setMap(this.map);
    this.addParcelLayer();

    this.context$$ = this.contextService.context$
      .subscribe((context: DetailedContext) => this.onChangeContext(context));

    this.searchResults$$ = this.searchStore.observable
      .subscribe((results: SearchResult[]) => this.onSearch(results));

    this.focusedSearchResult$$ = this.searchStore
      .observeFirstBy((result: SearchResult, state: State) => state.focused === true)
      .subscribe((result: SearchResult) => this.onFocusSearchResult(result));

    this.selectedEditor$$ = this.editorStore
      .observeFirstBy((editor: Editor, state: State) => state.selected === true)
      .subscribe((editor: Editor) => this.onSelectEditor(editor));
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

  onMapQuery(results: SearchResult[]) {
    // const features: Feature[] = results.features;
    // if (features.length > 0) {
    //   this.featureService.updateFeatures(features, features[0].source);
    // }
  }

  onSearchTermChange(term: string) {
    if (this.searchState.searchTypes.indexOf(CLIENT) >= 0) {
      this.onBeforeSearchClient();
    } else {
      this.onBeforeSearch();
    }
  }

  onDestroyEditorComponent() {
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

  private onSearch(results: SearchResult[]) {
    if (results.length === 0) {
      this.onClearSearch();
      return;
    }

    const searchClient = results.some((result: SearchResult) => {
      return result.meta.dataType === CLIENT;
    });

    if (searchClient) {
      this.onSearchClient(results[0].data as Client);
    }
  }

  private onBeforeSearchClient() {
    this.closeToastPanel();

    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeExpansionPanel();
    } else {
      this.openExpansionPanel();
    }

    this.editionState.selectEditor(this.clientState.parcelEditor);

    const tool = this.toolService.getTool('client');
    this.toolService.selectTool(tool);

    this.openSidenav();
  }

  private onSearchClient(client: Client) {}

  private onFocusSearchResult(result: SearchResult) {
    if (result === undefined) {
      // this.feature = undefined;
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

  private onClearSearch() {
    this.feature = undefined;
    this.closeToastPanel();
    this.clientState.clearClient();
  }

  private onSelectEditor(editor: Editor) {
    this.editor = editor;
  }

  private addParcelLayer() {
    this.parcelLayer = createParcelLayer();
    this.map.addLayer(this.parcelLayer, false);
    this.parcelLoader = new EntityLoader(this.parcelLayer, this.parcelStore);
    this.parcelLoader.activate();
  }

}
