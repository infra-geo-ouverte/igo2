import { Injectable} from '@angular/core';

import { EntityTableTemplate, EntityTableColumnRenderer } from 'src/lib/entity';

import { ClientSchemaElement } from './client-schema-element.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClientSchemaElementTableService {

  static elementIcons = {
    'Point': 'place',
    'LineString': 'show_chart',
    'Polygon': 'crop_square'
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
          renderer: EntityTableColumnRenderer.Icon,
          valueAccessor: (element: ClientSchemaElement) => {
            return ClientSchemaElementTableService.elementIcons[element.geometry.type];
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
