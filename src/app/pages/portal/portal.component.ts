import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { MediaService } from '@igo2/core';
import { Context, ContextService, ToolService } from '@igo2/context';
import {
  DataSourceService,
  Feature,
  FeatureService,
  IgoMap,
  LayerService,
  MapService,
  OverlayService,
  SearchService
} from '@igo2/geo';

import {
  controlSlideX,
  controlSlideY,
  mapSlideX,
  mapSlideY
} from './portal.animation';

import proj4 from 'proj4';
import * as olproj from 'ol/proj';
import * as olproj4 from 'ol/proj/proj4';


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
      attribution: {
        collapsed: false
      }
    }
  });

  public sidenavOpened = false;
  public toastOpened = false;
  public toastShown = false;

  // True after the initial context is loaded
  private contextLoaded = false;

  constructor(
    private route: ActivatedRoute,
    public featureService: FeatureService,
    public mediaService: MediaService,
    public toolService: ToolService,
    public searchService: SearchService,
    public overlayService: OverlayService,
    public mapService: MapService,
    public layerService: LayerService,
    public dataSourceService: DataSourceService,
    public contextService: ContextService,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    proj4.defs('EPSG:32198', '+proj=lcc +lat_1=60 +lat_2=46 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 +ellps=GRS80 +datum=NAD83 +units=m +no_defs');
    olproj4.register(proj4)
    olproj.get('EPSG:32198').setExtent([-886251.0296, 180252.9126, 897177.3418, 2106143.8139]);
  
    window['IGO'] = this;

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
          features[0].type.toString() === 'Feature' &&
          (features[0].source !== 'Nominatim (OSM)' &&
            features[0].source !== 'ICherche Québec')
        ) {
          this.featureService.selectFeature(features[0]);
          this.overlayService.setFeatures([features[0]], 'zoom');
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
      if (params['layers'] && params['wmsUrl']) {
        this.addLayerByName(params['wmsUrl'], params['layers']);
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

    this.dataSourceService
      .createAsyncDataSource(properties)
      .pipe(debounceTime(100))
      .subscribe(dataSource => {
        const layerOptions = {
          title: name,
          source: dataSource
        };
        this.map.addLayer(this.layerService.createLayer(layerOptions));
      });
  }
}
