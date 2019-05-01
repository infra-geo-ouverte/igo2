
import * as olstyle from 'ol/style';

export function createAddressStyle(strokeColor: string): olstyle.Style {
  const stroke = new olstyle.Stroke({
    width: 2,
    color: strokeColor
  });

  const fill = new olstyle.Stroke({
    color: [0, 161, 222, 0.15]
  });

  return new olstyle.Style({
    stroke,
    fill,
    image: new olstyle.Circle({
      radius: 7,
      stroke,
      fill
    }),
    text: new olstyle.Text({
      font: '12px Calibri,sans-serif',
      fill: new olstyle.Fill({ color: '#000' }),
      stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
      overflow: true
    })
  });
}
