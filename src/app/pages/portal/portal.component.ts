import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ContextService, Feature, FeatureService,
         IgoMap, QueryFormat, MediaService,
         ToolService, WMSLayerOptions } from 'igo2';


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.styl']
})
export class PortalComponent implements OnInit, OnDestroy {

  public selectedFeature$$: Subscription;
  public features$$: Subscription;

  public map = new IgoMap();

  public sidenavOpened: boolean = false;
  public toastOpened: boolean = false;
  public toastShown: boolean = false;

  constructor(public featureService: FeatureService,
              public mediaService: MediaService,
              public toolService: ToolService,
              private contextService: ContextService) {}

  ngOnInit() {
    this.features$$ = this.featureService.features$
      .subscribe((features) => this.handleFeaturesChange(features));

    this.selectedFeature$$ = this.featureService.selectedFeature$
      .subscribe((feature) => this.handleFeatureSelect(feature));

    const projection = 'EPSG:3857';
    this.contextService.setContext({
      uri: 'qc911',
      title: 'Qc-911',
      map: {
        view: {
          projection: projection,
          center: [-72, 52],
          zoom: 6
        }
      },
      layers: [
        {
          type: 'osm',
          title: 'OSM'
        },
        {
          title: 'MSP DESSERTE MUN 911',
          type: 'wms',
          source: {
            url: '/cgi-wms/igo_gouvouvert.fcgi',
            params: {
              layers: 'MSP_DESSERTE_MUN_911',
              version: '1.3.0'
            },
            projection: projection
          },
          queryFormat: QueryFormat.GML2,
          queryTitle: 'Municipalite'
        } as WMSLayerOptions,
        {
          title: 'Embâcle',
          type: 'wms',
          source: {
            url: 'http://geoegl.msp.gouv.qc.ca/cgi-wms/igo_gouvouvert.fcgi',
            params: {
              layers: 'vg_observation_v_inondation_embacle_wmst',
              version: '1.3.0'
            },
            projection: projection
          },
          timeFilter: {
            min: '2017-01-01',
            max: '2018-01-01',
            type: 'date',
            range: true
          }
        } as WMSLayerOptions
      ],
      toolbar: [
        'searchResults',
        'map',
        'timeFilter'
      ],
      tools: [
        {
          name: 'searchResults'
        },
        {
          name: 'map'
        },
        {
          name: 'timeAnalysis'
        }
      ]
    });
  }

  ngOnDestroy() {
    this.selectedFeature$$.unsubscribe();
    this.features$$.unsubscribe();
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
}
