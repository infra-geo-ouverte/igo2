// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { AuthOptions } from '@igo2/auth';
import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import { SearchSourceOptions, CatalogServiceOptions } from '@igo2/geo';

interface Environment {
  production: boolean;
  igo: {
    auth?: AuthOptions;
    catalog?: CatalogServiceOptions;
    context?: ContextServiceOptions;
    language?: LanguageOptions;
    searchSources?: { [key: string]: SearchSourceOptions };
  };
}

export const environment: Environment = {
  production: false,
  igo: {
    auth: {
      url: '/apis/users',
      tokenKey: 'id_token_igo',
      allowAnonymous: true
    },
    catalog: {
      sources: [
        {
          id: 'Gououvert',
          title: 'Gouvouvert',
          url: '/apis/ws/igo_gouvouvert.fcgi'
        },
        {
          id: 'glace',
          title: 'Carte de glace',
          url: '/apis/ws/radarsat.fcgi'
        }
      ]
    },
    // context: {
    //   url: '/apis/igo2',
    //   defaultContextUri: '5'
    // },
    language: {
      prefix: './locale/'
    },
    searchSources: {
      nominatim: {
        available: false
      },
      icherche: {
        searchUrl: '/apis/icherche',
        order: 2,
        params: {
          limit: '8'
        }
      },
      icherchereverse: {
        searchUrl: '/apis/territoires',
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
    }
  }
};
