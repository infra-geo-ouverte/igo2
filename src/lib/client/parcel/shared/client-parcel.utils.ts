import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { padClientNum } from '../../shared/client.utils';
import { ClientParcelDiagram, ClientParcel } from './client-parcel.interfaces';

export function getDiagramsFromParcels(parcels: ClientParcel[]): ClientParcelDiagram[] {
  const diagramIds = new Set(parcels.map((parcel: ClientParcel) => {
    return parcel.properties.noDiagramme;
  }));

  return Array.from(diagramIds).map((id: number) => {
    return {id};
  });
}

export function createParcelLayer(): VectorLayer {
  const parcelDataSource = new FeatureDataSource();
  return new VectorLayer({
    title: 'Parcelles du client',
    zIndex: 100,
    source: parcelDataSource,
    style: createParcelLayerStyle(),
    removable: false,
    browsable: false
  });
}

export function createParcelLayerStyle(): (olFeature: OlFeature) => olstyle.Style {
  const style = new olstyle.Style({
    stroke: new olstyle.Stroke({
      width: 2
    }),
    fill:  new olstyle.Fill(),
    text: createParcelLayerTextStyle()
  });

  return (function(feature: OlFeature) {
    const color = getParcelFeatureColor(feature);
    style.getFill().setColor(color.concat([0.15]));
    style.getStroke().setColor(color);
    style.getText().setText(feature.get('_mapTitle'));
    return style;
  });
}

function createParcelLayerTextStyle(): olstyle.Text {
  return new olstyle.Text({
    font: '16px Calibri,sans-serif',
    fill: new olstyle.Fill({ color: '#000' }),
    stroke: new olstyle.Stroke({ color: '#fff', width: 3 }),
    overflow: true
  });
}

function getParcelFeatureColor(olFeature: OlFeature) {
  const clientRech = olFeature.get('noClientRecherche');
  const clientDet = olFeature.get('noClientDetenteur') || clientRech;
  const clientExp = olFeature.get('noClientExploitant') || clientDet;

  let color;
  if (clientRech === clientDet) {
    color = clientRech === clientExp ? [255, 139, 0] : [35, 140, 0];
  } else {
    color = [0, 218, 250];
  }

  return color;
}

