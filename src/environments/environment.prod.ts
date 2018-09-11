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
        enabled: true
      },
      icherche: {
        enabled: false,
        url: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode'
      },
      datasource: {
        enabled: false,
        url: 'https://geoegl.msp.gouv.qc.ca/igo2/api/layers/search'
      }
    },
    language: {
      prefix: './locale/'
    }
  }
};
