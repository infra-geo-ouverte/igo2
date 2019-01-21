import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

export function createSchemaElementPointLayer(): VectorLayer {
  const schemaElementPointDataSource = new FeatureDataSource();
  return new VectorLayer({
    title: 'Points du schéma',
    zIndex: 101,
    source: schemaElementPointDataSource,
    style: createSchemaElementPointLayerStyle()
  });
}

export function createSchemaElementPointLayerStyle(): (olFeature: OlFeature) => olstyle.Style {
  const style = new olstyle.Style({
    image: new olstyle.Circle({
      radius: 6,
      fill: new olstyle.Fill({color: [128, 21, 21, 0.15]}),
      stroke: new olstyle.Stroke({
        width: 2,
        color: [128, 21, 21]
      })
    }),
    // text: createSchemaElementPointLayerTextStyle()
  });

  return (function(olFeature: OlFeature) {
    // const color = getSchemaElementPointFeatureColor(olFeature);
    // style.getImage().getFill().setColor(color.concat([0.15]));
    // style.getImage().getStroke().setColor(color);
    // style.getText().setText(olFeature.get('etiquette'));
    return style;
  });
}

function createSchemaElementPointLayerTextStyle(): olstyle.Text {
  return new olstyle.Text({
    font: '16px Calibri,sans-serif',
    fill: new olstyle.Fill({ color: '#000' }),
    stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
    overflow: true
  });
}

function getSchemaElementPointFeatureColor(olFeature: OlFeature) {
  return [128, 21, 21];
}
