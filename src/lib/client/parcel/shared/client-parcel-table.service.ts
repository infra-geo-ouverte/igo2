import { Injectable} from '@angular/core';

import { EntityTableTemplate, EntityTableColumnRenderer } from '@igo2/common';

import { formatDate } from 'src/lib/utils/date';
import { padClientNum } from '../../shared/client.utils';
import { ClientInfoService } from '../../info/shared/client-info.service';
import { ClientParcel } from './client-parcel.interfaces';

@Injectable()
export class ClientParcelTableService {

  constructor(private clientInfoService: ClientInfoService) {}

  buildTable(): EntityTableTemplate {
    return {
      selection: true,
      selectionCheckbox: true,
      selectMany: true,
      sort: true,
      headerClassFunc: (() => {
        return {'text-centered': true};
      }),
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
          name: 'properties.production',
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
            if (value === parcel.properties.noClientRecherche) { return value; }
            return this.computeClientNumAnchor(value);
          }
        },
        {
          name: 'properties.noClientExploitant',
          title: 'Exploitant',
          renderer: EntityTableColumnRenderer.HTML,
          valueAccessor: (parcel: ClientParcel) => {
            const value = parcel.properties.noClientExploitant;
            if (!value) { return ''; }
            if (value === parcel.properties.noClientRecherche) { return value; }
            return this.computeClientNumAnchor(value);
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
          name: 'properties.timbreMajGeometrie',
          title: 'Date de mise à jour',
          valueAccessor: (parcel: ClientParcel) => {
            const value = parcel.properties.timbreMajGeometrie;
            if (!value) { return ''; }
            return formatDate(value);
          }
        },
        {
          name: 'properties.usagerMajGeometrie',
          title: 'Utilisateur'
        }
      ]
    };
  }

  private computeClientNumAnchor(clientNum: number): string {
    const link = this.clientInfoService.getClientInfoLink(padClientNum(clientNum));
    return `<a target="popup" href="${link}">${clientNum}</a>`;
    // TODO: this gets sanitized so either bypass sanitization or remove it
    // const onClick = `window.open(${link}, 'Client', 'width=800, height=600'); return false;`;
    // return `<a target="popup" href="${link}" onClick="${onClick}">${clientNum}</a>`;
  }
}
