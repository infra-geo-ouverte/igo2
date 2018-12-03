import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { padClientNum } from '../../shared/client.utils';
import { ClientParcelDiagram, ClientParcel } from './client-parcel.interfaces';

export function getDiagramsFromParcels(parcels: ClientParcel[]): ClientParcelDiagram[] {
  const diagramIds = new Set(parcels.map((parcel: ClientParcel) => {
    return parcel.properties.noDiagramme;
  }));

  return Array.from(diagramIds).map((id: string) => {
    return {id};
  });
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
  const clientRech = padClientNum(feature.get('noClientRecherche'));
  const clientDet = padClientNum(feature.get('noClient'));
  const clientExp = padClientNum(feature.get('noClientExploitant'));

  let color;
  if (clientRech === clientDet) {
    color = clientRech === clientExp ? [255, 139, 0] : [35, 140, 0];
  } else {
    color = [0, 218, 250];
  }
  return color;
}

