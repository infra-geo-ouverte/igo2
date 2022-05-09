// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { AuthOptions } from '@igo2/auth';
import { DOMOptions } from '@igo2/common';
import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import {
  SearchSourceOptions,
  CatalogServiceOptions,
  Projection,
  ImportExportServiceOptions,
  CommonVectorStyleOptions
} from '@igo2/geo';

interface Environment {
  production: boolean;
  igo: {
    app: {
      forceCoordsNA: boolean;
    };
    auth?: AuthOptions;
    catalog?: CatalogServiceOptions;
    context?: ContextServiceOptions;
    importExport?: ImportExportServiceOptions;
    language?: LanguageOptions;
    searchSources?: { [key: string]: SearchSourceOptions };
    projections?: Projection[];
    interactiveTour?: { tourInMobile: boolean; pathToConfigFile: string };
    depot?: { url: string; trainingGuides?: string[]; };
    dom?: DOMOptions[];
    queryOverlayStyle?: {
      base?: CommonVectorStyleOptions,
      selection?: CommonVectorStyleOptions,
      focus?: CommonVectorStyleOptions
    };
    searchOverlayStyle?: {
      base?: CommonVectorStyleOptions,
      selection?: CommonVectorStyleOptions,
      focus?: CommonVectorStyleOptions
    };
  };
}

export const environment: Environment = {
  production: false,
  igo: {
    app: {
      forceCoordsNA: true
    },
    auth: {
      url: '/apis/users',
      tokenKey: 'id_token_igo',
      allowAnonymous: true,
      trustHosts: ['geoegl.msp.gouv.qc.ca']
      /*,hostsByKey: [{
         domainRegFilters: '(https:\/\/|http:\/\/)?(.*domain.com)(.*)',
         keyProperty: 'key',
         keyValue: '123456',
      }]*/
    },
    catalog: {
      sources: [
        {
          id: 'Image Arcgis Rest',
          title: 'Image Arcgis Rest',
          externalProvider: true,
          url: 'https://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer',
          type: 'imagearcgisrest',
          sourceOptions: {
            queryable: true
          }
        },
        {
          id: 'Gououvert',
          title: 'Gouvouvert',
          url: '/apis/ws/igo_gouvouvert.fcgi'
        },
        {
          id: 'glace',
          title: 'Carte de glace',
          url: '/apis/ws/radarsat.fcgi',
          showLegend: true
        },
        {
          id: 'baselayerWMTS',
          title: 'Fonds / Baselayers',
          url: '/carto/wmts',
          type: 'wmts',
          matrixSet: 'EPSG_3857',
          version: '1.3.0'
        },
        {
          id: 'fusion_catalog',
          title: '(composite catalog) fusion catalog',
          url: '',
          composite: [
            {
              id: 'tq_swtq',
              url: 'https://ws.mapserver.transports.gouv.qc.ca/swtq'
            },
            {
              id: 'rn_wmts',
              url:
                'https://servicesmatriciels.mern.gouv.qc.ca/erdas-iws/ogc/wmts/Cartes_Images',
              type: 'wmts',
              setCrossOriginAnonymous: true,
              matrixSet: 'EPSG_3857',
              version: '1.0.0'
            }
          ]
        },
        {
          id: 'forced_properties',
          title: 'Forced properties catalog (layer name and abstract)',
          url: '',
          composite: [
            {
              id: 'forcedProperties_wmts',
              url:
                'https://servicesmatriciels.mern.gouv.qc.ca/erdas-iws/ogc/wmts/Cartes_Images',
              type: 'wmts',
              setCrossOriginAnonymous: true,
              matrixSet: 'EPSG_3857',
              version: '1.0.0',
              forcedProperties: [{
                layerName: 'BDTQ-20K_Allegee',
                title: 'Nouveau nom pour cette couche WMTS'
              }]
            },
            {
              id: 'forcedProperties_wms',
              url: 'https://ws.mapserver.transports.gouv.qc.ca/swtq',
              type: 'wms',
              forcedProperties: [{
                layerName: 'lieuhabite',
                title: 'Nouveau nom pour cette couche WMS'
              }]
            },
            {
              id: 'forcedProperties_arcgisrest',
              url: 'https://gisp.dfo-mpo.gc.ca/arcgis/rest/services/FGP/Seafloor_SubstratBenthique/MapServer',
              externalProvider: true,
              type: 'arcgisrest',
              forcedProperties: [{
                layerName: 'Sediment substrate / Substrat sédimentaire',
                title: 'Nouveau nom pour cette couche ArcGIS REST'
              }]
            }
          ]
        },
        {
          id: 'group_impose',
          title:
            '(composite catalog) group imposed and unique layer title for same source',
          url: '',
          composite: [
            {
              id: 'tq_swtq',
              url: 'https://ws.mapserver.transports.gouv.qc.ca/swtq',
              regFilters: ['zpegt'],
              groupImpose: { id: 'zpegt', title: 'zpegt' }
            },
            {
              id: 'Gououvert',
              url: 'https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi',
              regFilters: ['zpegt'],
              groupImpose: { id: 'zpegt', title: 'zpegt' }
            },
            {
              id: 'Gououvert',
              url: 'https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi',
              regFilters: ['zpegt'],
              groupImpose: { id: 'zpegt', title: 'zpegt' }
            },
            {
              id: 'rn_wmts',
              url:
                'https://servicesmatriciels.mern.gouv.qc.ca/erdas-iws/ogc/wmts/Cartes_Images',
              type: 'wmts',
              setCrossOriginAnonymous: true,
              matrixSet: 'EPSG_3857',
              version: '1.0.0',
              groupImpose: {
                id: 'cartetopo',
                title: 'Carte topo échelle 1/20 000'
              }
            }
          ]
        },
        {
          id: 'tag_layernametitle',
          title: '(composite catalog) tag source on same layer title',
          url: '',
          composite: [
            {
              id: 'tq_swtq',
              url: 'https://ws.mapserver.transports.gouv.qc.ca/swtq',
              regFilters: ['limtn_charg'],
              groupImpose: {
                id: 'mix_swtq_gouv',
                title: 'mix same name layer'
              }
            },
            {
              id: 'Gououvert',
              url: 'https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi',
              regFilters: ['limtn_charg'],
              groupImpose: {
                id: 'mix_swtq_gouv',
                title: 'mix same name layer'
              }
            }
          ]
        }
      ]
    },
    // context: {
    //   url: '/apis/igo2',
    //   defaultContextUri: '5'
    // },
    depot: {
      url: '/apis/depot'
    },
    // dom: [
    //   {
    //     name: 'test-dom',
    //     value: [
    //       {
    //         id: "Radar photo fixe",
    //         value: "Radar photo fixe"
    //       },
    //       {
    //         id: "Radar photo mobile",
    //         value: "Radar photo mobile"
    //       }
    //     ]
    //   }
    // ],
    language: {
      prefix: './locale/'
    },
    interactiveTour: {
      tourInMobile: true,
      pathToConfigFile: './config/interactiveTour.json'
    },
    importExport: {
      url: '/apis/ogre'
    },
    searchSources: {
      nominatim: {
        available: false
      },
      storedqueries: {
        available: false
      },
      icherche: {
        searchUrl: '/apis/icherche',
        order: 2,
        params: {
          limit: '5'
        }
      },
      coordinatesreverse: {
        showInPointerSummary: true
      },
      icherchereverse: {
        showInPointerSummary: true,
        searchUrl: '/apis/terrapi',
        order: 3,
        enabled: true
      },
      ilayer: {
        searchUrl: '/apis/icherche/layers',
        order: 4,
        params: {
          limit: '5'
        }
      },
      cadastre: {
        enabled: false
      }
    },
    projections: [
      {
        code: 'EPSG:32198',
        alias: 'Quebec Lambert',
        def:
          '+proj=lcc +lat_1=60 +lat_2=46 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 +ellps=GRS80 \
          +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        extent: [-799574, 45802, 891595.4, 1849567.5]
      },
      {
        code: 'EPSG:3798',
        alias: 'MTQ Lambert',
        def:
          '+proj=lcc +lat_1=50 +lat_2=46 +lat_0=44 +lon_0=-70 +x_0=800000 +y_0=0 \
          +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        extent: [31796.5834, 158846.2231, 1813323.4284, 2141241.0978]
      }
    ],
    searchOverlayStyle: {
      base: {
        markerColor: '#5ed0fb', // marker fill
        markerOpacity: 0.8, // marker opacity not applied if a rgba markerColor is provided
        markerOutlineColor: '#a7e7ff', // marker contour
        fillColor: '#5ed0fb', // poly
        fillOpacity: 0.2, // poly fill opacity not applied if a rgba fillColor is provided
        strokeColor: '#5ed0fb', // line and poly
        strokeOpacity: 0.7, // line and poly not applied if a rgba strokeColor is provided
        strokeWidth: 2 // line and poly
      },
      focus: {
        markerColor: '#5ed0fb', // marker fill
        markerOpacity: 1, // marker opacity not applied if a rgba markerColor is provided
        markerOutlineColor: '#DFF7FF', // marker contour
        fillColor: '#5ed0fb', // poly
        fillOpacity: 0.3, // poly fill opacity not applied if a rgba fillColor is provided
        strokeColor: '#DFF7FF', // line and poly
        strokeOpacity: 1, // line and poly not applied if a rgba strokeColor is provided
        strokeWidth: 2 // line and poly
      },
      selection: {
        markerColor: '#00a1de', // marker fill
        markerOpacity: 1, // marker opacity not applied if a rgba markerColor is provided
        markerOutlineColor: '#ffffff', // marker contour
        fillColor: '#00a1de', // poly
        fillOpacity: 0.3, // poly fill opacity not applied if a rgba fillColor is provided
        strokeColor: '#00A1DE', // line and poly
        strokeOpacity: 1, // line and poly not applied if a rgba strokeColor is provided
        strokeWidth: 2 // line and poly
      }
    },
    queryOverlayStyle: {
      base: {
        markerColor: '#5ed0fb', // marker fill
        markerOpacity: 0.8, // marker opacity not applied if a rgba markerColor is provided
        markerOutlineColor: '#a7e7ff', // marker contour
        fillColor: '#5ed0fb', // poly
        fillOpacity: 0.2, // poly fill opacity not applied if a rgba fillColor is provided
        strokeColor: '#5ed0fb', // line and poly
        strokeOpacity: 0.7, // line and poly not applied if a rgba strokeColor is provided
        strokeWidth: 2 // line and poly
      },
      focus: {
        markerColor: '#5ed0fb', // marker fill
        markerOpacity: 1, // marker opacity not applied if a rgba markerColor is provided
        markerOutlineColor: '#DFF7FF', // marker contour
        fillColor: '#5ed0fb', // poly
        fillOpacity: 0.3, // poly fill opacity not applied if a rgba fillColor is provided
        strokeColor: '#DFF7FF', // line and poly
        strokeOpacity: 1, // line and poly not applied if a rgba strokeColor is provided
        strokeWidth: 2 // line and poly
      },
      selection: {
        markerColor: '#00a1de', // marker fill
        markerOpacity: 1, // marker opacity not applied if a rgba markerColor is provided
        markerOutlineColor: '#ffffff', // marker contour
        fillColor: '#00a1de', // poly
        fillOpacity: 0.3, // poly fill opacity not applied if a rgba fillColor is provided
        strokeColor: '#00A1DE', // line and poly
        strokeOpacity: 1, // line and poly not applied if a rgba strokeColor is provided
        strokeWidth: 2 // line and poly
      }
    }
  }
};
