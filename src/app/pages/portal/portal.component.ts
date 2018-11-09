import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Media, MediaService } from '@igo2/core';
import {
  DetailedContext,
  ContextService,
  ToolService
} from '@igo2/context';

import { IgoMap } from '@igo2/geo';

import { Entity, EntityStore } from './../../modules/entity/shared';
import { ProjectionService } from '../../modules/map/shared';
import { SearchStoreService } from '../../modules/search/shared';

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
  public context$$: Subscription;

  public searchEntities$$: Subscription;
  public selectedSearchEntities$$: Subscription;
  public focusedSearchEntities$: Observable<Entity[]>;

  public expansionPanelExpanded = false;
  public infoPanelOpened = false;
  public sidenavOpened = false;

  public map: IgoMap;

  // True after the initial context is loaded
  private contextLoaded = false;

  get searchStore(): EntityStore<Entity> {
    return this.searchStoreService.getStore();
  }

  constructor(
    private projectionService: ProjectionService,
    public contextService: ContextService,
    public mediaService: MediaService,
    public searchStoreService: SearchStoreService,
    public toolService: ToolService
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

    this.context$$ = this.contextService.context$.subscribe(context =>
      this.handleContextChange(context)
    );

    this.searchEntities$$ = this.searchStore.observable
      .subscribe((entities: Entity[]) =>
        this.handleSearchEntitiesChange(entities)
      );

    this.selectedSearchEntities$$ = this.searchStore
      .observeBy((entity: Entity, state) => state.selected === true)
      .subscribe((entities: Entity[]) => this.handleSearchEntitiesSelect(entities));

    this.focusedSearchEntities$ = this.searchStore
      .observeBy((entity: Entity, state) => state.focused === true);
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.searchEntities$$.unsubscribe();
    this.selectedSearchEntities$$.unsubscribe();
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

  private handleSearchEntitiesChange(entities: Entity[]) {
    if (entities.length === 0) {
      return;
    }

    this.openSidenav();
    const searchResults = this.toolService.getTool('searchResultsFadq');
    this.toolService.selectTool(searchResults);
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
}
