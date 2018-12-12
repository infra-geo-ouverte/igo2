import { Injectable} from '@angular/core';

import { EntityTableTemplate } from 'src/lib/entity';

import { ClientSchema } from './client-schema.interfaces';

@Injectable({
  providedIn: 'root'
})
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
          name: 'type',
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
          name: 'timbreMaj',
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
