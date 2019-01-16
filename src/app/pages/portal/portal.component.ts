import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MediaService, ConfigService } from '@igo2/core';
import { AuthService } from '@igo2/auth';
import { Context, ContextService, ToolService } from '@igo2/context';
import {
  DataSourceService,
  Feature,
  FeatureService,
  IgoMap,
  LayerService,
  MapService,
  OverlayAction,
  OverlayService,
  SearchService,
  CapabilitiesService
} from '@igo2/geo';

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
  static SWIPE_ACTION = {
    RIGHT: 'swiperight',
    LEFT: 'swipeleft'
  };

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

  public sidenavOpened = false;
  public toastOpened = false;
  public toastShown = false;
  public sidenavTitle;

  // True after the initial context is loaded
  private contextLoaded = false;
  // True after the initial tool is loaded
  private toolLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private configService: ConfigService,
    public authService: AuthService,
    public featureService: FeatureService,
    public mediaService: MediaService,
    public toolService: ToolService,
    public searchService: SearchService,
    public overlayService: OverlayService,
    public mapService: MapService,
    public layerService: LayerService,
    public dataSourceService: DataSourceService,
    public contextService: ContextService,
    public cdRef: ChangeDetectorRef,
    public capabilitiesService: CapabilitiesService

  ) {}

  ngOnInit() {
    window['IGO'] = this;

    this.sidenavTitle = this.configService.getConfig('sidenavTitle');

    this.authService.authenticate$.subscribe(
      () => (this.contextLoaded = false)
    );

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

  closeSidenav() {
    this.sidenavOpened = false;
    this.toastOpened = false;
    if (
      this.mediaService.media$.value === 'mobile' &&
      this.featureService.focusedFeature$.value
    ) {
      this.toastShown = true;
    }
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

  removeMapBrowserClass(e) {
    e.element.classList.remove('toast-shown-offset');
    e.element.classList.remove('toast-opened-offset');
    e.element.classList.remove('sidenav-offset');
  }

  updateMapBrowserClass(e) {
    if (this.mediaService.media$.value === 'mobile') {
      if (this.toastOpened && this.toastShown) {
        e.element.classList.add('toast-opened-offset');
        return;
      }
      if (this.toastShown) {
        e.element.classList.add('toast-shown-offset');
      }
      return;
    }
    if (this.sidenavOpened) {
      e.element.classList.add('sidenav-offset');
    }
  }

  swipe(action: string) {
    const featuresList = this.featureService.features$.value;
    const focusedFeature = this.featureService.focusedFeature$.value;

    let index = featuresList.findIndex(f => f.id === focusedFeature.id);
    if (index < 0) {
      return;
    }

    if (action === PortalComponent.SWIPE_ACTION.LEFT) {
      index += 1;
    } else if (action === PortalComponent.SWIPE_ACTION.RIGHT) {
      index -= 1;
    }

    if (featuresList[index]) {
      this.featureService.selectFeature(featuresList[index]);
    }
  }

  handleQueryResults(results) {
    const features: Feature[] = results.features;
    if (features[0]) {
      this.featureService.updateFeatures(features, features[0].source);
    }
  }

  private handleFeaturesChange(features: Feature[]) {
    if (features.length > 0) {
      if (this.mediaService.media$.value === 'mobile') {
        if (
          features[0].type === 'Feature' &&
          (features[0].source !== 'Nominatim (OSM)' &&
            features[0].source !== 'ICherche Québec')
        ) {
          this.featureService.selectFeature(features[0]);
          this.overlayService.setFeatures(
            [features[0]],
            OverlayAction.ZoomIfOutMapExtent
          );
          this.toastShown = true;
          return;
        }
      }

      this.openSidenav();
      const tool = this.toolService.getTool('searchResults');
      this.toolService.selectTool(tool);
    }
  }

  private handleFeatureSelect(feature: Feature) {
    if (feature && this.mediaService.media$.value === 'mobile') {
      if (this.sidenavOpened) {
        this.closeSidenav();
        this.cdRef.detectChanges();
      }
    } else {
      this.toastShown = false;
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

    this.route.queryParams.subscribe(params => {
      if (params['sidenav']) {
      if (params['sidenav'] === '1') {
        this.openSidenav();
      }
    }
    if (params['layers'] && params['wmsUrl']) {
      const layers = params['layers'].split(',');
      layers.forEach(layer => {
        this.addLayerByName(params['wmsUrl'], layer);
      });
    }
    if (params['tool'] && !this.toolLoaded) {
        const toolNameToOpen = params['tool'];
        if (this.toolService.allowedToolName.indexOf(toolNameToOpen) !== -1) {
          const tool = this.toolService.getTool(toolNameToOpen);
          setTimeout(() => {
            this.toolService.selectTool(tool);
          }, 250); // add delay for translationservice to be injected
        }
        this.toolLoaded = true;
      }
    });
  }

  private addLayerByName(url: string, name: string) {
    const properties = {
      type: 'wms' as any,
      // format: 'wms',
      url: url,
      params: {
        layers: name
      }
    };

    this.capabilitiesService
    .getWMSOptions(properties).subscribe(capabilities => {
    this.dataSourceService
      .createAsyncDataSource(capabilities)
      .pipe(debounceTime(100))
      .subscribe(dataSource => {
        const layerOptions = {
          source: Object.assign(dataSource,
          {options: {
            optionsFromCapabilities: true,
            _layerOptionsFromCapabilities: (capabilities as any)._layerOptionsFromCapabilities} })
        };
        this.map.addLayer(this.layerService.createLayer(layerOptions));
      });
    });
  }
}
