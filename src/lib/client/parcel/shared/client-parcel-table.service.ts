import { Injectable} from '@angular/core';

import { EntityTableTemplate, EntityTableColumnRenderer } from '@igo2/common';

import { ClientParcel } from './client-parcel.interfaces';

@Injectable()
export class ClientParcelTableService {

  constructor() {}

  buildTable(): EntityTableTemplate {
    return {
      selection: true,
      sort: true,
      rowClassFunc: ((parcel: ClientParcel) => {
        return {'text-centered': true};
      }),
      columns: [
        {
          name: 'properties.noParcelleAgricole',
          title: 'Numéro de parcelle'
        },
        {
          name: 'properties.noDiagramme',
          title: 'Numéro de diagramme'
        },
        {
          name: 'production',
          title: 'Code de production'
        },
        {
          name: 'properties.descriptionProduction',
          title: 'Description de production'
        },
        {
          name: 'properties.superficie',
          title: 'Superficie mesurée (m²)'
        },
        {
          name: 'properties.superficieHectare',
          title: 'Superficie mesurée (ha)'
        },
        {
          name: 'properties.pourcentageSupMao',
          title: 'Superficie (%)'
        },
        {
          name: 'properties.superficieMao',
          title: 'Superficie (ha)'
        },
        {
          name: 'properties.superficieDeclaree',
          title: 'Superficie déclarée'
        },
        {
          name: 'properties.codeDefaultCultural',
          title: 'Code de défaut cultural'
        },
        {
          name: 'properties.pourcentageDefautCultural',
          title: 'Pourcentage de défaut cultural'
        },
        {
          name: 'properties.noConfirmation',
          title: 'Numéro de confirmation IVEG'
        },
        {
          name: 'properties.noClientDetenteur',
          title: 'Détenteur',
          renderer: EntityTableColumnRenderer.HTML,
          valueAccessor: (parcel: ClientParcel) => {
            const value = parcel.properties.noClientDetenteur;
            if (!value) { return ''; }
            if (value === parcel.properties.noClientRecherche) {
              return value;
            }
            return `<a target="popup" href="">${value}</a>`;
          }
        },
        {
          name: 'properties.noClientExploitant',
          title: 'Exploitant',
          renderer: EntityTableColumnRenderer.HTML,
          valueAccessor: (parcel: ClientParcel) => {
            const value = parcel.properties.noClientExploitant;
            if (!value) { return ''; }
            if (value === parcel.properties.noClientRecherche) {
              return value;
            }
            return `<a target="popup" href="">${value}</a>`;
          }
        },
        {
          name: 'properties.statutAugmentationSupCultivable',
          title: 'Statut de déboisement'
        },
        {
          name: 'properties.parcelleDrainee',
          title: 'Drainage'
        },
        {
          name: 'properties.sourceParcelleAgricole',
          title: 'Source parcelle agricole'
        },
        {
          name: 'properties.typeParcelleAgricole',
          title: 'Type de parcelle'
        },
        {
          name: 'properties.timbreMajGeometrie',
          title: 'Date de mise à jour'
        },
        {
          name: 'properties.usagerMajGeometrie',
          title: 'Utilisateur'
        }
      ]
    };
  }
}
