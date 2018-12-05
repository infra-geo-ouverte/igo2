// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import { CatalogServiceOptions } from '@igo2/geo';

import { ApiConfig } from '../app/modules/core/api/api.interface';
import { SearchSourceOptions } from '../app/modules/search/shared/sources/source.interface';
import { ClientApiConfig } from '../app/modules/client/shared/client.interfaces';

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

/* tslint:disable */
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
      url: 'http://chabou01-svn.fadq.qc'
    },
    client: {
      api: {
        info: {
          get: '/services/FADQ/RelationAffaires/InformationClient/obtenirListeClients'
        },
        parcel: {
          list: '/app/interne/igolocalisation/recherche_client/obtenirParcellesProductionsClientAnnee/${clientNum}/${annee}',
          years: '/app/interne/igolocalisation/recherche_client/obtenirAnneesTraitementParcelleAgricole'
        },
        schema: {
          list: '/app/interne/igolocalisation/recherche_client/obtenirSchemasClient/${clientNum}',
          create: '/app/interne/igolocalisation/recherche_client/ajouterSchema',
          update: '/app/interne/igolocalisation/recherche_client/modifierSchema',
          delete: '/app/interne/igolocalisation/recherche_client/supprimerSchema/${id}',
          duplicate: '/app/interne/igolocalisation/recherche_client/copierSchema/${id}',
          domains: {
            type: '/app/interne/igolocalisation/recherche_client/obtenirTypesSchemas'
          }
        },
        schemaFile: {
          list: '/app/interne/igolocalisation/recherche_client/obtenirDocumentsSchema/${schemaId}',
          create: '/app/interne/igolocalisation/recherche_client/ajouterDocumentSchema',
          delete: '/app/interne/igolocalisation/recherche_client/supprimerDocumentSchema/${id}'
        }
      }
    }
  },
};
