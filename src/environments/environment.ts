// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { AppEnvironmentOptions } from './environnement.interface';

export const environment: AppEnvironmentOptions = {
  production: false,
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
    storage: {
      url: '/apis/igo2/user/igo',
      key: 'igo'
    },
    /*context: {
      url: '/apis/igo2',
      defaultContextUri: '5'
    },*/
    depot: {
      url: '/apis/depot'
    },
    dom: [
      {
        id: 1,
        name: 'test-dom',
        values: [
          { id: 'Radar photo fixe', value: 'Radar photo fixe' },
          { id: 'Radar photo mobile', value: 'Radar photo mobile' }
        ]
      },
      {
        id: 1,
        name: 'dom_test',
        url: 'https://ws.mapserver.transports.gouv.qc.ca/applicatif?service=WFS&request=GetFeature&version=2.0.0&outputformat=dom&typenames=dom&dom=dom_test'
      }
    ],
    language: {
      prefix: './locale/'
    },
    interactiveTour: {
      tourInMobile: false,
      activateInteractiveTour: false,
      pathToConfigFile: './config/interactiveTour.json'
    },
    importExport: {
      importWithStyle: false,
      url: '/apis/ogre',
      configFileToGeoDBService: './data/geoDataToIDB.json',
      clientSideFileSizeMaxMb: 32,
      allowToStoreLayer: true
    },
    searchSources: {
      workspace: {
        available: false
      },
      nominatim: {
        available: false
      },
      storedqueries: {
        available: false
      },
      icherche: {
        available: true,
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/icherche/',
        params: {
          limit: '5'
        },
        showInPointerSummary: true
      },
      coordinatesreverse: {
        available: false
      },
      icherchereverse: {
        available: false
      },
      ilayer: {
        available: false
      },
      cadastre: {
        available: false
      }
    },
    projections: [
      {
        code: 'EPSG:32198',
        alias: 'Quebec Lambert',
        def: '+proj=lcc +lat_1=60 +lat_2=46 +lat_0=44 +lon_0=-68.5 +x_0=0 +y_0=0 +ellps=GRS80 \
          +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
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
  },
  //immeublesUrl: 'http://vps-5d30fe87.vps.ovh.ca:3000/v1/query/immeublesVw2'
  immeublesUrl: 'http://vps-5d30fe87.vps.ovh.ca:3000/v1/immeubles/search',
  buildingDetailsUrl: 'http://vps-5d30fe87.vps.ovh.ca:3000/v1/immeuble/'
};
