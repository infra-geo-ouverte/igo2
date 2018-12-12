import { Injectable} from '@angular/core';

import { EntityTableTemplate } from 'src/lib/entity';

import { ClientSchemaElementSurface } from './client-schema-element.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementTableService {

  constructor() {}

  buildSurfaceTable(): EntityTableTemplate {
    return {
      selection: true,
      sort: true,
      rowClassFunc: ((schemaElementSurface: ClientSchemaElementSurface) => {
        return {'text-centered': true};
      }),
      columns: [
        {
          name: 'properties.idElementGeometrique',
          title: 'ID élément'
        },
        {
          name: 'properties.typeElement',
          title: 'Type d\'élément'
        },
        {
          name: 'properties.etiquette',
          title: 'Étiquette'
        },
        {
          name: 'properties.description',
          title: 'Description'
        },
        {
          name: 'properties.anneImage',
          title: 'Année d\'image'
        },
        {
          name: 'properties.timbreMaj',
          title: 'Date de mise à jour'
        },
        {
          name: 'properties.usagerMaj',
          title: 'Usager mise à jour'
        }
      ]
    };
  }
}
