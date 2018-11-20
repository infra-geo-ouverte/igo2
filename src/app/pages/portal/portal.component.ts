import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

import { Media, MediaService } from '@igo2/core';
import {
  ContextService,
  DetailedContext,
  Tool,
  ToolService
} from '@igo2/context';

import { Client, ClientSchema } from '../../modules/client/shared/client.interface';
import { ClientStoreService } from '../../modules/client/shared/client-store.service';
import { Editor } from '../../modules/edition/shared/editor';
import { EditorService } from '../../modules/edition/shared/editor.service';
import { EntityStore } from '../../modules/entity/shared/store';
import { State } from '../../modules/entity/shared/entity.interface';
import { IgoMap } from '../../modules/map/shared/map';
import { MapService } from '../../modules/map/shared/map.service';
import { ProjectionService } from '../../modules/map/shared/projection.service';
import { SearchResult } from '../../modules/search/shared/search.interface';
import { SearchStoreService } from '../../modules/search/shared/search-store.service';
import { ClientSearchSource } from '../../modules/search/shared/sources/client';

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

  public editor: Editor;
  public editor$$: Subscription;
  public searchResults$$: Subscription;
  public selectedSearchResults$$: Subscription;
  public focusedSearchResults$: Observable<SearchResult[]>;

  public expansionPanelExpanded = false;
  public infoPanelOpened = false;
  public sidenavOpened = false;
  public map: IgoMap;

  // True after the initial context is loaded
  private contextLoaded = false;
  private context$$: Subscription;
  private selectedEditor$$: Subscription;
  private searchEntities$$: Subscription;
  private selectedSearchEntities$$: Subscription;

  get searchStore(): EntityStore<SearchResult> {
    return this.searchStoreService.store;
  }

  get editorStore(): EntityStore<Editor> {
    return this.editorService.store;
  }

  get tool$(): Observable<Tool> {
    return this.toolService.selectedTool$;
  }

  constructor(
    private projectionService: ProjectionService,
    private mapService: MapService,
    private contextService: ContextService,
    private mediaService: MediaService,
    private searchStoreService: SearchStoreService,
    private toolService: ToolService,
    private clientStoreService: ClientStoreService,
    private editorService: EditorService
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
    this.mapService.setMap(this.map);

    this.context$$ = this.contextService.context$
      .subscribe((context: DetailedContext) =>  this.handleContextChange(context));

    this.searchResults$$ = this.searchStore.observable
      .subscribe((results: SearchResult[]) =>
        this.handleSearchResultsChange(results)
      );

    this.selectedSearchResults$$ = this.searchStore
      .observeBy((result: SearchResult, state: State) => state.selected === true)
      .subscribe((results: SearchResult[]) => this.handleSearchResultsSelect(results));

    this.focusedSearchResults$ = this.searchStore
      .observeBy((result: SearchResult, state: State) => state.focused === true);

    this.selectedEditor$$ = this.editorStore
      .observeFirstBy((editor: Editor, state: State) => state.selected === true)
      .subscribe((editor: Editor) => this.handleEditorSelect(editor));
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.searchResults$$.unsubscribe();
    this.selectedSearchResults$$.unsubscribe();
    this.selectedEditor$$.unsubscribe();
  }

  get backdropShown(): boolean {
    return this.mediaService.media$.value === Media.Mobile && this.sidenavOpened;
  }

  get expansionPanelBackdropShown(): boolean {
    return this.expansionPanelExpanded && this.infoPanelOpened;
  }

  closeInfoPanel() {
    this.infoPanelOpened = false;
  }

  openInfoPanel() {
    this.infoPanelOpened = true;
  }

  toggleInfoPanel() {
    this.infoPanelOpened ? this.closeInfoPanel() : this.openInfoPanel();
  }

  closeSidenav() {
    this.sidenavOpened = false;
  }

  openSidenav() {
    this.sidenavOpened = true;
  }

  toggleSidenav() {
    this.sidenavOpened ? this.closeSidenav() : this.openSidenav();
  }

  handleQueryResults(results: SearchResult[]) {
    // const features: Feature[] = results.features;
    // if (features.length > 0) {
    //   this.featureService.updateFeatures(features, features[0].source);
    // }
  }

  private handleContextChange(context: DetailedContext) {
    if (context !== undefined) {
      this.toolService.setTools(context.tools);

      if (this.contextLoaded) {
        const mapDetails = this.toolService.getTool('mapDetails');
        this.toolService.selectTool(mapDetails);
      }
      this.contextLoaded = true;
    }
  }

  private handleSearchResultsChange(results: SearchResult[]) {
    if (results.length === 0) {
      return;
    }

    this.openSidenav();

    const withClients = results.some((result: SearchResult) => {
      return result.source instanceof ClientSearchSource;
    });

    if (withClients) {
      const client = results[0].data as Client;
      this.handleSearchClient(client);
    } else {
      const searchResults = this.toolService.getTool('searchResultsFadq');
      this.toolService.selectTool(searchResults);
    }
  }

  private handleSearchResultsSelect(results: SearchResult[]) {
    if (results.length === 0) {
      this.closeInfoPanel();
      return;
    }

    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeSidenav();
    }
    this.openInfoPanel();
  }

  private handleSearchClient(client: Client) {
    this.clientStoreService.setClient(client);
    const clientInfo = this.toolService.getTool('clientInfo');
    this.toolService.selectTool(clientInfo);

    // const schemaEditor = this.clientStoreService.schemaEditor;
    // this.editorService.selectEditor(schemaEditor);
  }

  private handleEditorSelect(editor: Editor) {
    this.editor = editor;
  }

}
