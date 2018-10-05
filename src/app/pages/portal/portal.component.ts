import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Media, MediaService } from '@igo2/core';
import {
  Context,
  ContextService,
  ToolService
} from '@igo2/context';

import {
  Feature,
  FeatureService,
  IgoMap
} from '@igo2/geo';

import { ProjectionService } from '../../modules/map/shared';

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
  public searchType: string = 'Client';
  public searchTypes: string[] = ['Client', 'Localisation', 'Couche de données'];

  public selectedFeature$$: Subscription;
  public features$$: Subscription;
  public context$$: Subscription;

  public map = new IgoMap({
    controls: {
      scaleLine: true,
      attribution: {
        collapsed: false
      }
    }
  });

  public expansionPanelExpanded = false;
  public infoPanelOpened = false;
  public sidenavOpened = false;

  // True after the initial context is loaded
  private contextLoaded = false;

  constructor(
    private projectionService: ProjectionService, // TODO: We don't want to inject that
    public contextService: ContextService,
    public featureService: FeatureService,
    public mediaService: MediaService,
    public toolService: ToolService,
  ) {}

  ngOnInit() {
    this.features$$ = this.featureService.features$.subscribe(features =>
      this.handleFeaturesChange(features)
    );

    this.selectedFeature$$ = this.featureService.selectedFeature$.subscribe(
      feature => this.handleFeatureSelect(feature)
    );

    this.context$$ = this.contextService.context$.subscribe(context =>
      this.handleContextChange(context)
    );
  }

  ngOnDestroy() {
    this.selectedFeature$$.unsubscribe();
    this.features$$.unsubscribe();
    this.context$$.unsubscribe();
  }

  get backdropShown(): boolean {
    return this.mediaService.media$.value === Media.Mobile && this.sidenavOpened;
  }

  get expansionPanelBackdropShown(): boolean {
    return this.expansionPanelExpanded && this.infoPanelOpened;
  };

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

  handleQueryResults(results) {
    const features: Feature[] = results.features;
    if (features.length > 0) {
      this.featureService.updateFeatures(features, features[0].source);
    }
  }

  private handleFeaturesChange(features: Feature[]) {
    if (features.length > 0) {
      this.openSidenav();
      const searchResults = this.toolService.getTool('searchResults');
      this.toolService.selectTool(searchResults);
    }
  }

  private handleFeatureSelect(feature: Feature) {
    if (feature === undefined) {
      return
    }
  
    if (feature && this.mediaService.media$.value === Media.Mobile) {
      this.closeSidenav();
    }
    this.openInfoPanel();
  }

  private handleContextChange(context: Context) {
    if (context !== undefined && this.contextLoaded) {
      const mapDetails = this.toolService.getTool('mapDetails');
      this.toolService.selectTool(mapDetails);
    }

    this.contextLoaded = context !== undefined;
  }
}
