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
          list: '/services/FADQ/Geomatique/Schema/obtenirSchemasClient/{clientNum}',
          create: '/services/FADQ/Geomatique/Schema/ajouterSchema',
          update: '/services/FADQ/Geomatique/Schema/modifierSchema',
          delete: '/services/FADQ/Geomatique/Schema/supprimerSchema/${id}',
          copy: '/services/FADQ/Geomatique/Schema/copierSchema/${id}'
        }
      }
    }
  }
};
