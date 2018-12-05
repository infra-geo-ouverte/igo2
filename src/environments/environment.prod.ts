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
  production: true,
  igo: {
    searchSources: {
      nominatim: {
        enabled: true
      },
      icherche: {
        enabled: false,
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode'
      },
      datasource: {
        enabled: false,
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/igo2/api/layers/search'
      }
    },
    language: {
      prefix: './locale/'
    },
    api: {
      url: 'http://netphp.fadq.qc'
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
  }
};
