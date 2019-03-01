import { Injectable} from '@angular/core';

import { EntityTableTemplate } from '@igo2/common';

import { ClientSchema } from './client-schema.interfaces';

@Injectable()
export class ClientSchemaTableService {

  constructor() {}

  buildTable(): EntityTableTemplate {
    return {
      selection: true,
      sort: true,
      rowClassFunc: ((schema: ClientSchema) => {
        return {'text-centered': true};
      }),
      columns: [
        {
          name: 'id',
          title: 'Numéro de schéma'
        },
        {
          name: 'descriptionType',
          title: 'Type de schéma'
        },
        {
          name: 'description',
          title: 'Description'
        },
        {
          name: 'annee',
          title: 'Année'
        },
        {
          name: 'etat',
          title: 'État'
        },
        {
          name: 'timbreMaj.date',
          title: 'Date de mise à jour'
        },
        {
          name: 'usagerMaj',
          title: 'Usager mise à jour'
        },
        {
          name: 'nbDocuments',
          title: 'Fichiers joints'
        }
      ]
    };
  }
}
