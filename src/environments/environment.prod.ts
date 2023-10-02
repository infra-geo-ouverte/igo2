import { LanguageOptions } from '@igo2/core';
import {
  CommonVectorStyleOptions,
  ImportExportServiceOptions,
  OptionsApiOptions,
  Projection,
  SearchSourceOptions,
  SpatialFilterOptions
} from '@igo2/geo';

import {
  AppOptions,
  InteractiveTourConfigOptions
} from './environnement.interface';

export interface Environment {
  production: boolean;
  igo: {
    app: AppOptions;
    importExport?: ImportExportServiceOptions;
    language?: LanguageOptions;
    searchSources?: { [key: string]: SearchSourceOptions };
    optionsApi?: OptionsApiOptions;
    projections?: Projection[];
    spatialFilter?: SpatialFilterOptions;
    interactiveTour?: InteractiveTourConfigOptions;
    depot?: { url: string; trainingGuides?: string[] };
    queryOverlayStyle?: {
      base?: CommonVectorStyleOptions;
      selection?: CommonVectorStyleOptions;
      focus?: CommonVectorStyleOptions;
    };
    searchOverlayStyle?: {
      base?: CommonVectorStyleOptions;
      selection?: CommonVectorStyleOptions;
      focus?: CommonVectorStyleOptions;
    };
  };
}

export const environment: Environment = {
  production: true,
  igo: {
    app: {
      forceCoordsNA: true,
      install: {
        enabled: false,
        promote: false
      },
      pwa: {
        enabled: false
      }
    },
    importExport: {
      url: '/apis/ogre'
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
        available: false
      }
    },
    depot: {
      url: '/apis/depot'
    },
    optionsApi: {
      url: '/apis/igo2/layers/options'
    },
    spatialFilter: {
      url: '/apis/terrapi/'
    },
    projections: [
      {
        code: 'EPSG:32198',
        alias: 'Quebec Lambert',
        def: '+proj=lcc +lat_1=60 +lat_2=46 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 \
          +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
        extent: [-799574, 45802, 891595.4, 1849567.5]
      },
      {
        code: 'EPSG:3798',
        alias: 'MTQ Lambert',
        def: '+proj=lcc +lat_1=50 +lat_2=46 +lat_0=44 +lon_0=-70 +x_0=800000 +y_0=0 \
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
