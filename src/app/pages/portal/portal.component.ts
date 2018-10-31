import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Media, MediaService } from '@igo2/core';
import {
  DetailedContext,
  ContextService,
  ToolService
} from '@igo2/context';

import { IgoMap } from '@igo2/geo';

import { Record, DataStore } from './../../modules/data/shared';
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

  public searchRecords$$: Subscription;
  public selectedSearchRecords$$: Subscription;

  public expansionPanelExpanded = false;
  public infoPanelOpened = false;
  public sidenavOpened = false;

  public map: IgoMap;

  // True after the initial context is loaded
  private contextLoaded = false;

  get searchStore(): DataStore<Record> {
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

    this.searchRecords$$ = this.searchStore.records$
      .subscribe((records: Record[]) =>
        this.handleSearchRecordsChange(records)
      );

    this.selectedSearchRecords$$ = this.searchStore.selected$
      .subscribe((records: Record[]) =>
        this.handleSearchRecordsSelect(records)
      );
  }

  ngOnDestroy() {
    this.context$$.unsubscribe();
    this.searchRecords$$.unsubscribe();
    this.selectedSearchRecords$$.unsubscribe();
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

  handleQueryResults(records: Record[]) {
    // const features: Feature[] = results.features;
    // if (features.length > 0) {
    //   this.featureService.updateFeatures(features, features[0].source);
    // }
  }

  private handleSearchRecordsChange(records: Record[]) {
    if (records.length === 0) {
      return;
    }

    this.openSidenav();
    const searchResults = this.toolService.getTool('searchResultsFadq');
    this.toolService.selectTool(searchResults);
  }

  private handleSearchRecordsSelect(records: Record[]) {
    if (records.length === 0) {
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
