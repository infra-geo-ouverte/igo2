import { LanguageOptions } from '@igo2/core';
import {
  SearchSourceOptions,
  ImportExportServiceOptions,
  CatalogServiceOptions
} from '@igo2/geo';

interface Environment {
  production: boolean;
  igo: {
    catalog?: CatalogServiceOptions;
    importExport?: ImportExportServiceOptions;
    language?: LanguageOptions;
    searchSources?: { [key: string]: SearchSourceOptions };
  };
}

export const environment: Environment = {
  production: true,
  igo: {
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
          url: 'https://geoegl.msp.gouv.qc.ca/apis/ws/radarsat.fcgi'
        }
      ]
    },
    importExport: {
      url: 'https://geoegl.msp.gouv.qc.ca/apis/ogre'
    },
    language: {
      prefix: './locale/'
    },
    searchSources: {
      nominatim: {
        available: false
      },
      icherche: {
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/icherche',
        order: 2,
        params: {
          limit: '8'
        }
      },
      icherchereverse: {
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/apis/territoires',
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
    }
  }
};
