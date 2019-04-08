import { ContextServiceOptions } from '@igo2/context';
import { LanguageOptions } from '@igo2/core';
import { CatalogServiceOptions, SearchSourceOptions } from '@igo2/geo';

import { ApiConfig } from 'src/lib/core/api/api.interfaces';
import { ClientApiConfig } from 'src/lib/client/shared/client.interfaces';

interface Environment {
  production: boolean;
  igo: {
    searchSources?: { [key: string]: SearchSourceOptions };
    language?: LanguageOptions;
    context?: ContextServiceOptions;
    catalog?: CatalogServiceOptions;
    api: ApiConfig;
    help: {
      logoLink: string;
      guideLink: string;
      newsLink: string;
    };
    client: {
      api: ClientApiConfig;
    };
    layer: {
      infoLink: string;
    };
  };
}

/* tslint:disable */
export const environment: Environment = {
  production: true,
  igo: {
    searchSources: {
      nominatim: {
        available: false,
        enabled: false
      },
      icherche: {
        available: true,
        enabled: true,
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/icherche/geocode',
        params: {
          type: 'adresse,code_postal,route,municipalite,mrc,region_administrative',
          limit: '5',
          geometrie: 'geom'
        }
      },
      datasource: {
        available: false,
        enabled: false,
        searchUrl: 'https://geoegl.msp.gouv.qc.ca/igo2/api/layers/search'
      },
      cadastre: {
        enabled: false,
        available: false
      }
    },
    language: {
      prefix: './locale/'
    },
    api: {
      url: 'http://netphp.fadq.qc/app/interne'
    },
    help: {
      logoLink: 'assets/images/logo_igo_text_md.png',
      guideLink: 'http://igo.fadq.qc/aide/IGO.pdf',
      newsLink: 'http://igo.fadq.qc/aide/Nouveautes_IGO.pdf'
    },
    layer: {
      infoLink: 'http://igodev.fadq.qc/interfaces/ModuleExterne/metadonnee.php?nomCouche=${layerName}&titre=${layerTitle}'
    },
    client: {
      api: {
        info: {
          get: '/igolocalisation/recherche_client/obtenirInformationClient/${clientNum}',
          link: 'http://igodev.fadq.qc/app/interne/personnes/coordonnees/presenter/${clientNum}'
        },
        parcel: {
          list: '/igolocalisation/recherche_client/obtenirParcellesProductionsClientAnnee/${clientNum}/${annee}',
          years: '/igolocalisation/recherche_client/obtenirAnneesTraitementParcelleAgricole'
        },
        schema: {
          list: '/igolocalisation/recherche_client/obtenirSchemasClient/${clientNum}',
          create: '/igoschema/edition_schema/ajouterSchema',
          update: '/igoschema/edition_schema/modifierSchema',
          delete: '/igoschema/edition_schema/supprimerSchema/${id}',
          duplicate: '/igoschema/edition_schema/copierSchema/${id}',
          domains: {
            type: '/igoschema/edition_schema/obtenirTypesSchemas',
            etat: '/igoschema/edition_schema/obtenirEtatsSchema'
          }
        },
        schemaFile: {
          list: '/igolocalisation/recherche_client/obtenirDocumentsSchema/${schemaId}',
          download: '/igolocalisation/recherche_client/obtenirDocumentSchema/${id}',
          create: '/igoschema/edition_schema/ajouterDocumentSchema/${schemaId}',
          delete: '/igoschema/edition_schema/supprimerDocumentSchema/${id}'
        },
        schemaElement: {
          save: '',
          points: '/igolocalisation/recherche_client/obtenirElementGeometriquePoint/${schemaId}',
          lines: '/igolocalisation/recherche_client/obtenirElementGeometriqueLigne/${schemaId}',
          surfaces: '/igolocalisation/recherche_client/obtenirElementGeometriqueSurface/${schemaId}',
          domains: {
            type: '/igoschema/edition_schema/obtenirTypesElementGeometriqueTypeSchema/${schemaType}'
          }
        }
      }
    }
  }
};
