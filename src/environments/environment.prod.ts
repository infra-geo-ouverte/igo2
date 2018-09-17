import { LanguageOptions } from '@igo2/core';
import { SearchSourcesOptions } from '@igo2/geo';

interface Environment {
  production: boolean;
  igo: {
    searchSources?: SearchSourcesOptions;
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
        url: '/icherche/geocode'
      },
      datasource: {
        url: '/igo2/api/layers/search'
      }
    },
    language: {
      prefix: './locale/'
    }
  }
};
