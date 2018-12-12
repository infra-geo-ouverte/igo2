import * as olstyle from 'ol/style';

export function padClientNum(clientNum: string) {
  return clientNum.padStart(7, '0');
}

export function createClientDefaultSelectionStyle(): olstyle.Style {
  const style = new olstyle.Style({
    stroke: new olstyle.Stroke({
      color: [0, 153, 255, 1],
      width: 2
    }),
    fill:  new olstyle.Fill({
      color: [0, 153, 255, 0.15]
    })
  });

  return style;
}
