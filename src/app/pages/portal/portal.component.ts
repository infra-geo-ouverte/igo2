import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Context, ContextService, Feature, FeatureService,
         IgoMap, MediaService, ToolService } from 'igo2';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.styl']
})
export class PortalComponent implements OnInit, OnDestroy {

  public selectedFeature$$: Subscription;
  public features$$: Subscription;
  public context$$: Subscription;

  public map = new IgoMap();

  public sidenavOpened: boolean = false;
  public toastOpened: boolean = false;
  public toastShown: boolean = false;

  // True after the initial context is loaded
  private contextLoaded = false;

  constructor(public featureService: FeatureService,
              public mediaService: MediaService,
              public toolService: ToolService,
              private contextService: ContextService) {}

  ngOnInit() {
    this.features$$ = this.featureService.features$
      .subscribe((features) => this.handleFeaturesChange(features));

    this.selectedFeature$$ = this.featureService.selectedFeature$
      .subscribe((feature) => this.handleFeatureSelect(feature));

    this.contextService.loadContext('_default');

    this.context$$ = this.contextService.context$
      .subscribe((context) => this.handleContextChange(context));
  }

  ngOnDestroy() {
    this.selectedFeature$$.unsubscribe();
    this.features$$.unsubscribe();
    this.context$$.unsubscribe();
  }

  closeSidenav() {
    this.sidenavOpened = false;
    this.toastOpened = false;
    this.toastShown = true;
  }

  openSidenav() {
    this.sidenavOpened = true;
    this.toastShown = false;
  }

  toggleSidenav() {
    if (this.sidenavOpened) {
      this.closeSidenav();
    } else {
      this.openSidenav();
    }
  }

  private handleFeaturesChange(features: Feature[]) {
    if (features.length > 0) {
      this.openSidenav();
      const tool = this.toolService.getTool('searchResults');
      this.toolService.selectTool(tool);
    }
  }

  private handleFeatureSelect(feature: Feature) {
    if (feature && this.mediaService.media$.value === 'mobile') {
      this.closeSidenav();
    }
  }

  private handleContextChange(context: Context) {
    if (context !== undefined && this.contextLoaded) {
      const tool = this.toolService.getTool('mapDetails');
      this.toolService.selectTool(tool);
    }

    if (context !== undefined) {
      this.contextLoaded = true;
    }
  }
}
