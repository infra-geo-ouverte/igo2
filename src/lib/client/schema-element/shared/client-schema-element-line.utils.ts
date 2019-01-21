import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

export function createSchemaElementLineLayer(): VectorLayer {
  const schemaElementLineDataSource = new FeatureDataSource();
  return new VectorLayer({
    title: 'Lines du schéma',
    zIndex: 103,
    source: schemaElementLineDataSource,
    style: createSchemaElementLineLayerStyle()
  });
}

export function createSchemaElementLineLayerStyle(): (olFeature: OlFeature) => olstyle.Style {
  const style = new olstyle.Style({
    stroke: new olstyle.Stroke({
      width: 2
    }),
    text: createSchemaElementLineLayerTextStyle()
  });

  return (function(olFeature: OlFeature) {
    const color = getSchemaElementLineFeatureColor(olFeature);
    style.getStroke().setColor(color);
    style.getText().setText(olFeature.get('etiquette'));
    return style;
  });
}

function createSchemaElementLineLayerTextStyle(): olstyle.Text {
  return new olstyle.Text({
    font: '16px Calibri,sans-serif',
    fill: new olstyle.Fill({ color: '#000' }),
    stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
    overflow: true
  });
}

function getSchemaElementLineFeatureColor(olFeature: OlFeature) {
  return [128, 21, 21];
}
