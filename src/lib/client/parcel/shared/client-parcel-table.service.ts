import { Injectable} from '@angular/core';

import { EntityTableTemplate } from 'src/lib/entity';

import { ClientParcel } from './client-parcel.interfaces';

@Injectable({
  providedIn: 'root'
})
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
          title: 'Production'
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
          name: 'properties.pourcentageSupMAO',
          title: 'Superficie (%)'
        },
        {
          name: 'properties.superficieMAO',
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
          name: 'properties.pourcentageDefaultCultural',
          title: 'Pourcentage de défaut cultural'
        },
        {
          name: 'properties.noConfirmation',
          title: 'Numéro de confirmation IVEG'
        },
        {
          name: 'properties.noClientDetenteur', // TODO: compute properly
          title: 'Détenteur'
        },
        {
          name: 'properties.noClientExploitant', // TODO: compute properly
          title: 'Exploitant'
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
        // TODO: complete
      ]
    };
  }
}
