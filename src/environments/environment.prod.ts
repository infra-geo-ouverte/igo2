import { LanguageOptions } from '@igo2/core';
import {
  SearchSourceOptions,
  ImportExportServiceOptions,
  Projection
} from '@igo2/geo';

interface Environment {
  production: boolean;
  igo: {
    importExport?: ImportExportServiceOptions;
    language?: LanguageOptions;
    searchSources?: { [key: string]: SearchSourceOptions };
    projections?: Projection[];
  };
}

export const environment: Environment = {
  production: true,
  igo: {
    importExport: {
      url: '/apis/ogre'
    },
    language: {
      prefix: './locale/'
    },
    searchSources: {
      nominatim: {
        available: false
      },
      icherche: {
        searchUrl: '/apis/icherche',
        order: 2,
        params: {
          limit: '8'
        }
      },
      icherchereverse: {
        searchUrl: '/apis/territoires',
        order: 3,
        enabled: true
      },
      ilayer: {
        searchUrl: '/apis/icherche/layers',
        order: 4,
        params: {
          limit: '5'
        }
      }
    },
    projections: [
      {
        code: 'EPSG:32198',
        def:
          '+proj=lcc +lat_1=60 +lat_2=46 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        extent: [-799574, 45802, 891595.4, 1849567.5]
      },
      {
        code: 'EPSG:3798',
        def:
          '+proj=lcc +lat_1=50 +lat_2=46 +lat_0=44 +lon_0=-70 +x_0=800000 +y_0=0 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        extent: [31796.5834, 158846.2231, 1813323.4284, 2141241.0978]
      }
    ]
  }
};
