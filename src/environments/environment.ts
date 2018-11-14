// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import { CatalogServiceOptions } from '@igo2/geo';

import { ApiConfig } from '../app/modules/core/api/api.interface';
import { SearchSourceOptions } from '../app/modules/search/shared/sources/source.interface';
import { ClientApiConfig } from '../app/modules/client/shared/client.interface';

interface Environment {
  production: boolean;
  igo: {
    searchSources?: { [key: string]: SearchSourceOptions };
    language?: LanguageOptions;
    context?: ContextServiceOptions;
    catalog?: CatalogServiceOptions;
    api?: ApiConfig;
    client: {
      api: ClientApiConfig;
    };
  };
}

export const environment: Environment = {
  production: false,
  igo: {
    searchSources: {
      nominatim: {
        enabled: true,
        params: {
          limit: '5'
        }
      },
      icherche: {
        enabled: true,
        searchUrl: '/icherche/geocode',
        params: {
          type: 'adresse,code_postal,route,municipalite,mrc,region_administrative',
          limit: '5',
          geometrie: 'geom'
        }
      },
      datasource: {
        enabled: true,
        searchUrl: '/ilayer/search',
        params: {
          limit: '5'
        }
      }
    },
    language: {
      prefix: './locale/'
    },
    api: {
      url: '/app/interne'
    },
    client: {
      api: {
        info: 'http://chabou01-svn.fadq.qc/services/FADQ/RelationAffaires/InformationClient/obtenirListeClients'
      }
    }
  },
};
