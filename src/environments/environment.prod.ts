import { SearchSourcesOptions, LanguageOptions } from '@igo2/igo2';

interface Environment {
  production: boolean;
  igo: {
    searchSources?: SearchSourcesOptions;
    language?: LanguageOptions;
  };
};

export const environment: Environment = {
  production: true,
  igo: {
    searchSources: {
      nominatim: {
        enabled: false
      },
      icherche: {
        url: '/icherche/geopasdecode'
      },
      datasource: {
        url: '/igo2/api/layers/search'
      }
    },
    language: {
      prefix: './assets/locale/'
    }
  }
};
