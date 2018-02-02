// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { SearchSourcesOptions, LanguageOptions, AuthOptions,
  ContextServiceOptions, CatalogServiceOptions } from '@igo2/igo2';

interface Environment {
  production: boolean;
  igo: {
    searchSources?: SearchSourcesOptions;
    language?: LanguageOptions;
    auth?: AuthOptions;
    context?: ContextServiceOptions;
    catalog?: CatalogServiceOptions
  };
};

export const environment: Environment = {
  production: false,
  igo: {
    searchSources: {
      nominatim: {
        enabled: false
      },
      icherche: {
        url: 'https://geoegl.msp.gouv.qc.ca/icherche/geopasdecode'
      },
      datasource: {
        url: 'https://geoegl.msp.gouv.qc.ca/igo2/api/layers/search'
      }
    },
    language: {
      prefix: './assets/locale/'
    }
  }
};
