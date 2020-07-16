import { LanguageOptions } from '@igo2/core';
import {
  SearchSourceOptions,
  ImportExportServiceOptions,
  CatalogServiceOptions,
  Projection
} from '@igo2/geo';

interface Environment {
  production: boolean;
  igo: {
    app: {
      forceCoordsNA: boolean;
    };
    catalog?: CatalogServiceOptions;
    importExport?: ImportExportServiceOptions;
    language?: LanguageOptions;
    searchSources?: { [key: string]: SearchSourceOptions };
    projections?: Projection[];
    interactiveTour?: {tourInMobile: boolean, pathToConfigFile: string};
  };
}

export const environment: Environment = {
  production: true,
  igo: {
    app: {
      forceCoordsNA: false
    },
    catalog: {
      sources: [
        {
          id: 'Gououvert',
          title: 'Gouvouvert',
          url: 'https://geoegl.msp.gouv.qc.ca/apis/ws/igo_gouvouvert.fcgi'
        },
        {
          id: 'glace',
          title: 'Carte de glace',
          url: 'https://geoegl.msp.gouv.qc.ca/apis/ws/radarsat.fcgi',
          showLegend: true
        }
      ]
    },
    importExport: {
      url: 'https://geoegl.msp.gouv.qc.ca/apis/ogre'
    },
    language: {
      prefix: './locale/'
    },
    interactiveTour: {
      tourInMobile: true,
      pathToConfigFile: './config/interactiveTour.json'
    },
    searchSources: {
      nominatim: {
        available: false
      },
      storedqueries: {
        available: false
      },
      icherche: {
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/icherche',
        order: 2,
        params: {
          limit: '8'
        }
      },
      coordinatesreverse: {
        showInPointerSummary: true
      },
      icherchereverse: {
        showInPointerSummary: true,
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/terrapi',
        order: 3,
        enabled: true
      },
      ilayer: {
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/icherche/layers',
        order: 4,
        params: {
          limit: '5'
        }
      }
    },
    projections: [
      {
        code: 'EPSG:32198',
        alias: 'Quebec Lambert',
        def:
          '+proj=lcc +lat_1=60 +lat_2=46 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 \
          +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
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
    ]
  }
};
