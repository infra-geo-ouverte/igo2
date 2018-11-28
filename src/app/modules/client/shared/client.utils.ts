import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { ClientDiagram, ClientParcel } from './client.interface';

export function getDiagramsFromParcels(parcels: ClientParcel[]): ClientDiagram[] {
  const diagramIds = new Set(parcels.map((parcel: ClientParcel) => {
    return parcel.properties.noDiagramme;
  }));

  return Array.from(diagramIds).map((id: string) => {
    return {id};
  }).sort();
}

export function createParcelLayer(): VectorLayer {
  const parcelDataSource = new FeatureDataSource();
  return new VectorLayer({
    title: 'Parcelles du client',
    zIndex: 100,
    source: parcelDataSource,
    style: createParcelLayerStyle()
  });
}

function createParcelLayerStyle(): (feature: OlFeature) => olstyle.Style {
  const style = new olstyle.Style({
    stroke: new olstyle.Stroke({
      width: 2
    }),
    fill:  new olstyle.Fill(),
    text: new olstyle.Text({
      font: '16px Calibri,sans-serif',
      fill: new olstyle.Fill({ color: '#000' }),
      stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
      overflow: true
    })
  });

  return (function(feature: OlFeature) {
    const color = getParcelFeatureColor(feature);
    style.getFill().setColor(color.concat([0.15]));
    style.getStroke().setColor(color);
    style.getText().setText(feature.get('noParcelleAgricole'));
    return style;
  });
}

function getParcelFeatureColor(feature: OlFeature) {
  const clientNum = feature.get('clientNum');
  const clientDet = feature.get('client');
  const clientExp = feature.get('clientExploitant');

  let color;
  if (clientNum === clientDet) {
    color = clientNum === clientExp ? [35, 140, 0] : [255, 139, 0];
  } else {
    color = [0, 218, 250];
  }
  return color;
}

