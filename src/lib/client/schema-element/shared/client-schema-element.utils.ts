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
  ClientSchemaElementType,
  ClientSchemaElementTypes,
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

    return {
      lstElementsAjoutes: inserts,
      lstElementsModifies: updates,
      lstIdElementsSupprimes: deletes
    };
  }

  private serializeInsert(operation: EntityOperation): Partial<ClientSchemaElement> {
    return this.serializeElement(operation.current as ClientSchemaElement);
  }

  private serializeUpdate(operation: EntityOperation): Partial<ClientSchemaElement> {
    return this.serializeElement(operation.current as ClientSchemaElement);
  }

  private serializeDelete(operation: EntityOperation): EntityKey {
    return operation.key;
  }

  private serializeElement(element: ClientSchemaElement): Partial<ClientSchemaElement> {
    return {
      type: element.type,
      geometry: element.geometry,
      properties: element.properties
    };
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
    removable: false,
    browsable: false
  });
}

export function createSchemaElementLayerStyle(
  types: ClientSchemaElementTypes
): (olFeature: OlFeature) => olstyle.Style {
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
    const elementType = olFeature.get('typeElement');
    const type = (types[geometryType] || []).find((_type: ClientSchemaElementType) => {
      return _type.value === elementType;
    });

    const style = styles[geometryType];
    if (geometryType === 'Point') {
      style.setImage(createSchemaPointShape(type));
    } else {
      const color = type ? type.color : getSchemaElementDefaultColor();
      style.getFill().setColor(color.concat([0.30]));
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

function createSchemaPointShape(type: ClientSchemaElementType): olstyle.Circle | olstyle.RegularShape  {
  const typeCode = type ? type.value : undefined;
  const color = type ? type.color : getSchemaElementDefaultColor();
  const factories = {
    'CAG': createCAGShape,
    'CRI': createCRIShape,
    'SIL': createSILShape
  };
  const factory = factories[typeCode] || createDefaultPointShape;
  return factory(color);
}

function createDefaultPointShape(color: [number, number, number]): olstyle.Circle  {
  return new olstyle.Circle({
    fill: new olstyle.Fill({
      color: color.concat([1])
    }),
    radius: 6,
    stroke: new olstyle.Stroke({
      width: 1,
      color: color
    })
  });
}

function createCAGShape(color: [number, number, number]): olstyle.RegularShape {
  return new olstyle.RegularShape({
    stroke: new olstyle.Stroke({
      width: 3,
      color: color
    }),
    points: 4,
    radius: 10,
    angle: Math.PI / 4
  });
}

function createCRIShape(color: [number, number, number]): olstyle.RegularShape {
  return new olstyle.RegularShape({
    stroke: new olstyle.Stroke({
      width: 3,
      color: color
    }),
    points: 3,
    radius: 10,
    angle: 0
  });
}

function createSILShape(color: [number, number, number]): olstyle.RegularShape {
  return new olstyle.Circle({
    radius: 10,
    stroke: new olstyle.Stroke({
      width: 3,
      color: color
    })
  });
}

function getSchemaElementDefaultColor() {
  return [128, 21, 21];
}
