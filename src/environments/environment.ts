// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { AuthOptions } from '@igo2/auth';
import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import { SearchSourcesOptions, CatalogServiceOptions } from '@igo2/geo';

interface Environment {
  production: boolean;
  igo: {
    searchSources?: SearchSourcesOptions;
    language?: LanguageOptions;
    auth?: AuthOptions;
    context?: ContextServiceOptions;
    catalog?: CatalogServiceOptions;
  };
}

export const environment: Environment = {
  production: false,
  igo: {
    searchSources: {
      nominatim: {
        enabled: true,
        url: '/osm'
      },
      icherche: {
        enabled: true,
        url: '/icherche/geocode'
      },
      datasource: {
        enabled: true,
        url: '/igo2/api/layers/search'
      }
    },
    language: {
      prefix: './locale/'
    }
  }
};
