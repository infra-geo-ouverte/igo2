import { Injectable} from '@angular/core';

import { EntityTableTemplate, EntityTableColumnRenderer } from '@igo2/common';

import { ClientSchemaElement } from './client-schema-element.interfaces';

@Injectable()
export class ClientSchemaElementTableService {

  static elementTypes = {
    'Point': 'P',
    'LineString': 'L',
    'Polygon': 'S'
  };

  constructor() {}

  buildTable(): EntityTableTemplate {
    return {
      selection: true,
      sort: true,
      rowClassFunc: ((schemaElement: ClientSchemaElement) => {
        return {'text-centered': true};
      }),
      columns: [
        {
          name: 'type',
          title: '',
          renderer: EntityTableColumnRenderer.HTML,
          valueAccessor: (element: ClientSchemaElement) => {
            return `<b>${ClientSchemaElementTableService.elementTypes[element.geometry.type]}`;
          }
        },
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
          name: 'properties.anneeImage',
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
