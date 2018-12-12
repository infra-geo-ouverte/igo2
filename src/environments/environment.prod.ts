import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import { CatalogServiceOptions } from '@igo2/geo';

import { ApiConfig } from 'src/lib/core/api/api.interfaces';
import { SearchSourceOptions } from 'src/lib/search/shared/sources/source.interfaces';
import { ClientApiConfig } from 'src/lib/client/shared/client.interfaces';

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
          download: '/app/interne/igolocalisation/recherche_client/obtenirDocumentSchema/${id}',
          create: '/app/interne/igoschema/edition_schema/ajouterDocumentSchema/${schemaId}',
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
  }
};
