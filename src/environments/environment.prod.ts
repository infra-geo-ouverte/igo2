import { LanguageOptions } from '@igo2/core';
import { SearchSourceOptions } from '@igo2/geo';

interface Environment {
  production: boolean;
  igo: {
    searchSources?: { [key: string]: SearchSourceOptions };
    language?: LanguageOptions;
  };
}

export const environment: Environment = {
  production: true,
  igo: {
    searchSources: {
      nominatim: {
        available: false
      },
      icherche: {
        searchUrl: '/apis/icherche/geocode',
        order: 2,
        params: {
          limit: '8'
        }
      },
      icherchereverse: {
        searchUrl: '/apis/territoires/locate',
        order: 3,
        enabled: true
      },
      ilayer: {
        searchUrl: '/apis/layers/search',
        order: 4,
        params: {
          limit: '5'
        }
      }
    },
    language: {
      prefix: './locale/'
    }
  }
};
