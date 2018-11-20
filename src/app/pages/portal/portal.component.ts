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
import { Entity, EntityStore } from '../../modules/entity/shared';
import { IgoMap } from '../../modules/map/shared/map';
import { MapService } from '../../modules/map/shared/map.service';
import { ProjectionService } from '../../modules/map/shared/projection.service';
import { SearchStoreService } from '../../modules/search/shared';
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

  public editor: Entity<Editor>;
  public focusedSearchEntities$: Observable<Entity[]>;
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

  get searchStore(): EntityStore<Entity> {
    return this.searchStoreService.store;
  }

  get editorStore(): EntityStore<Entity<Editor>> {
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

    this.context$$ = this.contextService.context$.subscribe((context: DetailedContext) => {
      this.handleContextChange(context);
    });

    this.searchEntities$$ = this.searchStore.observable
      .subscribe((entities: Entity[]) => {
        this.handleSearchEntitiesChange(entities);
      });

    this.selectedSearchEntities$$ = this.searchStore
      .observeBy((entity: Entity, state) => state.selected === true)
      .subscribe((entities: Entity[]) => {
        this.handleSearchEntitiesSelect(entities);
      });

    this.focusedSearchEntities$ = this.searchStore
      .observeBy((entity: Entity, state) => state.focused === true);
      
    this.selectedEditor$$ = this.editorStore.observeFirstBy((editor: Entity<Editor>) => {
        return this.editorStore.getEntityState(editor).selected === true;
      }).subscribe((editor: Entity<Editor>) => {
        this.handleEditorSelect(editor);
      });
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.searchEntities$$.unsubscribe();
    this.selectedSearchEntities$$.unsubscribe();
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

  handleQueryResults(entities: Entity[]) {
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

  private handleSearchEntitiesChange(entities: Entity[]) {
    if (entities.length === 0) {
      return;
    }

    this.openSidenav();

    const withClients = entities.some((entity: Entity) => {
      return entity.provider instanceof ClientSearchSource;
    });

    if (withClients) {
      const client = entities[0] as Entity<Client>;
      this.handleSearchClient(client);
    } else {
      const searchResults = this.toolService.getTool('searchResultsFadq');
      this.toolService.selectTool(searchResults);
    }
  }

  private handleSearchEntitiesSelect(entities: Entity[]) {
    if (entities.length === 0) {
      this.closeInfoPanel();
      return;
    }

    if (this.mediaService.media$.value === Media.Mobile) {
      this.closeSidenav();
    }
    this.openInfoPanel();
  }

  private handleSearchClient(client: Entity<Client>) {
    this.clientStoreService.setClient(client.data);
    const clientInfo = this.toolService.getTool('clientInfo');
    this.toolService.selectTool(clientInfo);

    //const schemaEditor = this.clientStoreService.schemaEditor;
    //this.editorService.selectEditor(schemaEditor);
  }

  private handleEditorSelect(editor: Entity<Editor>) {
    this.editor = editor;
  }

}
