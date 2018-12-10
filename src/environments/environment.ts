// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import { CatalogServiceOptions } from '@igo2/geo';

import { ApiConfig } from '../app/modules/core/api/api.interfaces';
import { SearchSourceOptions } from '../app/modules/search/shared/sources/source.interfaces';
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
      infoLink: string;
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
      infoLink: 'http://igo.fadq.qc/61_GestionDesRelationsAffaires/1_GestionIdentite/61_131_CoorClient.php?p_60131CliNum=${clientNum}',
      api: {
        info: {
          get: '/app/interne/igolocalisation/recherche_client/obtenirInformationClient/${clientNum}'
        },
        parcel: {
          list: '/app/interne/igolocalisation/recherche_client/obtenirParcellesProductionsClientAnnee/${clientNum}/${annee}',
          years: '/app/interne/igolocalisation/recherche_client/obtenirAnneesTraitementParcelleAgricole'
        },
        schema: {
          list: '/app/interne/igolocalisation/recherche_client/obtenirSchemasClient/${clientNum}',
          create: '/app/interne/igoschema/edition_schema/ajouterSchema',
          update: '/app/interne/igoschema/edition_schema/modifierSchema',
          delete: '/app/interne/igoschema/edition_schema/supprimerSchema/${id}',
          duplicate: '/app/interne/igoschema/edition_schema/copierSchema/${id}',
          domains: {
            type: '/app/interne/igoschema/edition_schema/obtenirTypesSchemas'
          }
        },
        schemaFile: {
          list: '/app/interne/igolocalisation/recherche_client/obtenirDocumentsSchema/${schemaId}',
          get: '/app/interne/igolocalisation/recherche_client/obtenirDocumentSchema/${id}',
          create: '/app/interne/igoschema/edition_schema/ajouterDocumentSchema',
          delete: '/app/interne/igoschema/edition_schema/supprimerDocumentSchema/${id}'
        },
        schemaElement: {
          save: '',
          point: {
            list: '/app/interne/igolocalisation/recherche_client/obtenirElementGeometriquePoint/${schemaId}'
          },
          line: {
            list: '/app/interne/igolocalisation/recherche_client/obtenirElementGeometriqueLine/${schemaId}'
          },
          surface: {
            list: '/app/interne/igolocalisation/recherche_client/obtenirElementGeometriqueSurface/${schemaId}'
          }
        }
      }
    }
  },
};
