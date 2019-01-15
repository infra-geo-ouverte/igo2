import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

/**
 * Create an overlay layer and it's source
 * @returns Overlay layer
 */
export function createOverlayLayer(): VectorLayer {
  const overlayDataSource = new FeatureDataSource();
  return new VectorLayer({
    zIndex: 300,
    source: overlayDataSource,
    style: createOverlayLayerStyle()
  });
}

/**
 * Create an overlay style with markers for points and a basic stroke/fill
 * combination for lines and polygons
 * @returns Style function
 */
function createOverlayLayerStyle(): (olFeature: OlFeature) => olstyle.Style {
  const defaultStyle = createOverlayDefaultStyle();
  const markerStyle = createOverlayMarkerStyle();

  return (function(olFeature: OlFeature) {
    const geometryType = olFeature.getGeometry().getType();
    const style = geometryType === 'Point' ? markerStyle : defaultStyle;
    style.getText().setText(olFeature.get('mapTitle'));
    return style;
  });
}

/**
 * Create a basic style for lines and polygons
 * @returns Style
 */
function createOverlayDefaultStyle(): olstyle.Style {
  const stroke = new olstyle.Stroke({
    width: 2,
    color: [0, 161, 222, 1]
  });

  const fill = new olstyle.Stroke({
    color: [0, 161, 222, 0.15]
  });

  return new olstyle.Style({
    stroke,
    fill,
    image: new olstyle.Circle({
      radius: 5,
      stroke: stroke,
      fill: fill
    }),
    text: new olstyle.Text({
      font: '12px Calibri,sans-serif',
      fill: new olstyle.Fill({ color: '#000' }),
      stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
      overflow: true
    })
  });
}

/**
 * Create a marker style for points
 * @returns Style
 */
function createOverlayMarkerStyle(color = 'blue'): olstyle.Style {
  let iconColor;
  switch (color) {
    case 'blue':
    case 'red':
    case 'yellow':
    case 'green':
      iconColor = color;
      break;
    default:
      iconColor = 'blue';
      break;
  }
  return new olstyle.Style({
    image: new olstyle.Icon({
      src: './assets/igo2/geo/icons/place_' + iconColor + '_36px.svg',
      imgSize: [36, 36], // for ie
      anchor: [0.5, 1]
    }),
    text: new olstyle.Text({
      font: '12px Calibri,sans-serif',
      fill: new olstyle.Fill({ color: '#000' }),
      stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
      overflow: true
    })
  });
}
