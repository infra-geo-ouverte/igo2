import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';
import OlGeoJSON from 'ol/format/GeoJSON';

import { EntityKey, EntityOperation, EntityOperationType } from '@igo2/common';
import {
  measureOlGeometryArea,
  FeatureDataSource,
  VectorLayer
} from '@igo2/geo';

import {
  ClientSchemaElement,
  ClientSchemaElementTransactionData
} from './client-schema-element.interfaces';

export function computeSchemaElementArea(element: ClientSchemaElement): number {
  if (element.geometry.type !== 'Polygon') { return; }

  const measureProjection = 'EPSG:32198';
  const olGeometry = new OlGeoJSON().readGeometry(element.geometry, {
    dataProjection: element.projection,
    featureProjection: measureProjection
  });
  return measureOlGeometryArea(olGeometry, measureProjection);
}

export class ClientSchemaElementTransactionSerializer {

  serializeOperations(operations: EntityOperation[]): ClientSchemaElementTransactionData {
    const inserts = [];
    const updates = [];
    const deletes = [];

    operations.forEach((operation: EntityOperation) => {
      if (operation.type === EntityOperationType.Insert) {
        inserts.push(this.serializeInsert(operation));
      } else if (operation.type === EntityOperationType.Update) {
        updates.push(this.serializeUpdate(operation));
      } else if (operation.type === EntityOperationType.Delete) {
        deletes.push(this.serializeDelete(operation));
      }
    });

    return {inserts, updates, deletes};
  }

  private serializeInsert(operation: EntityOperation): ClientSchemaElement {
    return operation.current as ClientSchemaElement;
  }

  private serializeUpdate(operation: EntityOperation): ClientSchemaElement {
    return operation.current as ClientSchemaElement;
  }

  private serializeDelete(operation: EntityOperation): EntityKey {
    return operation.key;
  }

}

export function generateOperationTitle(element: ClientSchemaElement): string {
  // TODO: this is for demo purpose. Make it clean.
  let geometryType;
  if (element.geometry.type === 'Point') {
    geometryType = 'Point';
  } else if (element.geometry.type === 'LineString') {
    geometryType = 'Ligne';
  } else if (element.geometry.type === 'Polygon') {
    geometryType = 'Surface';
  }

  const terms = [
    geometryType,
    element.properties.typeElement,
    element.properties.description || undefined
  ];
  return terms.filter((term: string) => term !== undefined).join(' - ');
}

export function createSchemaElementLayer(): VectorLayer {
  const schemaElementDataSource = new FeatureDataSource();
  return new VectorLayer({
    title: 'Éléments géométriques du schéma',
    zIndex: 103,
    source: schemaElementDataSource,
    style: createSchemaElementLayerStyle(),
    removable: false,
    browsable: false
  });
}

export function createSchemaElementLayerStyle(): (olFeature: OlFeature) => olstyle.Style {
  const styles = {
    'Point': new olstyle.Style({
      text: createSchemaElementLayerTextStyle()
    }),
    'LineString': new olstyle.Style({
      fill: new olstyle.Fill(),
      stroke: new olstyle.Stroke({
        width: 2
      }),
      text: createSchemaElementLayerTextStyle()
    }),
    'Polygon': new olstyle.Style({
      fill: new olstyle.Fill(),
      stroke: new olstyle.Stroke({
        width: 2
      }),
      text: createSchemaElementLayerTextStyle()
    }),
  };

  return (function(olFeature: OlFeature) {
    const geometryType = olFeature.getGeometry().getType();
    const style = styles[geometryType];
    const color = getSchemaElementFeatureColor(olFeature);

    if (geometryType === 'Point') {
      style.setImage(new olstyle.Circle({
        fill: new olstyle.Fill({
          color: color.concat([0.15])
        }),
        radius: 6,
        stroke: new olstyle.Stroke({
          width: 1,
          color: color
        })
      }));
    } else {
      style.getFill().setColor(color.concat([0.15]));
      style.getStroke().setColor(color);
    }
    style.getText().setText(olFeature.get('etiquette'));

    return style;
  });
}

function createSchemaElementLayerTextStyle(): olstyle.Text {
  return new olstyle.Text({
    font: '16px Calibri,sans-serif',
    fill: new olstyle.Fill({ color: '#000' }),
    stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
    overflow: true
  });
}

function getSchemaElementFeatureColor(olFeature: OlFeature) {
  return [128, 21, 21];
}
