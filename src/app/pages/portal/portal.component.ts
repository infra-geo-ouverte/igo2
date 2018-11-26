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

import { Client } from '../../modules/client/shared/client.interface';
import { ClientStoreService } from '../../modules/client/shared/client-store.service';
import { Editor } from '../../modules/edition/shared/editor';
import { EditorService } from '../../modules/edition/shared/editor.service';
import { getEntityTitle } from '../../modules/entity/shared/entity.utils';
import { EntityStore } from '../../modules/entity/shared/store';
import { FEATURE } from '../../modules/feature/shared/feature.enum';
import { Feature } from '../../modules/feature/shared/feature.interface';
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
  private selectedSearchResult$$: Subscription;
  private focusedSearchResult$$: Subscription;

  get backdropShown(): boolean {
    return this.mediaService.media$.value === Media.Mobile && this.sidenavOpened;
  }

  get expansionPanelBackdropShown(): boolean {
    return this.expansionPanelExpanded && this.toastPanelOpened;
  }

  get searchStore(): EntityStore<SearchResult> {
    return this.searchStoreService.store;
  }

  get editorStore(): EntityStore<Editor> {
    return this.editorService.store;
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
      .subscribe((context: DetailedContext) => this.onChangeContext(context));

    this.searchResults$$ = this.searchStore.observable
      .subscribe((results: SearchResult[]) => this.onSearch(results));

    this.selectedSearchResult$$ = this.searchStore
      .observeFirstBy((result: SearchResult, state: State) => state.selected === true)
      .subscribe((result: SearchResult) => this.onSelectSearchResult(result));

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
    this.selectedSearchResult$$.unsubscribe();
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

  private openToastPanel() {
    this.toastPanelOpened = true;
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
    if (context !== undefined) {
      this.toolService.setTools(context.tools);

      if (this.contextLoaded) {
        const mapDetails = this.toolService.getTool('mapDetails');
        this.toolService.selectTool(mapDetails);
      }
      this.contextLoaded = true;
    }
  }

  private onSearch(results: SearchResult[]) {
    if (results.length === 0) {
      return;
    }

    const withClients = results.some((result: SearchResult) => {
      return result.source instanceof ClientSearchSource;
    });

    if (withClients) {
      const client = results[0].data as Client;
      this.onSearchClient(client);
    } else {
      const searchResults = this.toolService.getTool('searchResultsFadq');
      this.toolService.selectTool(searchResults);
    }

    this.openSidenav();
  }

  private onSelectSearchResult(result: SearchResult) {
    if (result === undefined) {
      return;
    }

    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeSidenav();
    }
    this.openToastPanel();
  }

  private onFocusSearchResult(result: SearchResult) {
    if (result === undefined) {
      return;
    }

    if (result.meta.dataType === FEATURE) {
      this.feature = result.data as Feature;
      this.openToastPanel();
    } else {
      this.feature = undefined;
    }
  }

  private onSearchClient(client: Client) {
    this.clientStoreService.setClient(client);
    const clientInfo = this.toolService.getTool('clientInfo');
    this.toolService.selectTool(clientInfo);

    // const schemaEditor = this.clientStoreService.schemaEditor;
    // this.editorService.selectEditor(schemaEditor);
  }

  private onSelectEditor(editor: Editor) {
    this.editor = editor;
  }

}
