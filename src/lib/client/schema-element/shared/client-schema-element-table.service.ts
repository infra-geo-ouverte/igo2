import { Injectable} from '@angular/core';

import { EntityTableTemplate, EntityTableColumnRenderer } from '@igo2/common';
import { formatMeasure, squareMetersToAcres, squareMetersToHectares } from '@igo2/geo';

import { formatDate } from 'src/lib/utils/date';
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
      headerClassFunc: (() => {
        return {'text-centered': true};
      }),
      rowClassFunc: ((schemaElement: ClientSchemaElement) => {
        return {'text-centered': true};
      }),
      columns: [
        {
          name: 'geometry.type',
          title: 'Type',
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
          name: 'properties.descriptionTypeElement',
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
          name: 'properties.superficie',
          title: 'Superficie(m²)',
          valueAccessor: (element: ClientSchemaElement) => {
            const area = element.properties.superficie;
            return area ? formatMeasure(area, {decimal: 1, locale: 'fr'}) : '';
          }
        },
        {
          name: 'superficieHectares',
          title: 'Superficie (ha)',
          valueAccessor: (element: ClientSchemaElement) => {
            const area = element.properties.superficie;
            return area ? formatMeasure(squareMetersToHectares(area), {decimal: 1, locale: 'fr'}) : '';
          }
        },
        {
          name: 'superficieAcres',
          title: 'Superficie (acres)',
          valueAccessor: (element: ClientSchemaElement) => {
            const area = element.properties.superficie;
            return area ? formatMeasure(squareMetersToAcres(area), {decimal: 1, locale: 'fr'}) : '';
          }
        },
        {
          name: 'properties.anneeImage',
          title: 'Année d\'image'
        },
        {
          name: 'properties.timbreMaj',
          title: 'Date de mise à jour',
          valueAccessor: (element: ClientSchemaElement) => {
            const value = element.properties.timbreMaj;
            if (!value) { return ''; }
            return formatDate(value);
          }
        },
        {
          name: 'properties.usagerMaj',
          title: 'Usager mise à jour'
        }
      ]
    };
  }
}
