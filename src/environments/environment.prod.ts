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
        enabled: false
      },
      icherche: {
        searchUrl: '/apis/icherche/geocode',
        params: {
          limit: '8'
        }
      },
      ilayer: {
        searchUrl: '/apis/layers/search',
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
