import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import {
  Feature,
  FeatureMotion,
  featureToOl,
  moveToFeatures
} from 'src/lib/feature';
import { IgoMap } from 'src/lib/map';


export class Overlay {

  private map: IgoMap;
  private dataSource: FeatureDataSource;
  private layer: VectorLayer;
  private style: olstyle.Style;
  private markerStyle: olstyle.Style;

  constructor(map?: IgoMap) {
    this.dataSource = new FeatureDataSource();
    this.style = this.createStyle();
    this.markerStyle = this.createMarkerStyle();
    this.layer = new VectorLayer({
      zIndex: 300,
      style: this.style,
      source: this.dataSource
    });

    if (map !== undefined) {
      this.bind(map);
    }
  }

  bind(map: IgoMap) {
    this.map = map;
    this.map.addLayer(this.layer, false);
  }

  setFeatures(features: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    this.clear();
    this.addFeatures(features, motion);
  }

  addFeature(feature: Feature, motion: FeatureMotion = FeatureMotion.Default) {
    this.addFeatures([feature], motion);
  }

  addFeatures(features: Feature[], motion: FeatureMotion = FeatureMotion.Default) {
    const olFeatures = [];
    features.map((feature: Feature) => {
      const olFeature = featureToOl(feature, this.map.projection);
      const olGeometry = olFeature.getGeometry();
      if (olGeometry === null) {
        return;
      }

      if (olGeometry.getType() === 'Point') {
        olFeature.setStyle([this.markerStyle]);
      }

      olFeatures.push(olFeature);
    });

    this.addOlFeatures(olFeatures, motion);
  }

  clear() {
    this.dataSource.ol.clear();
  }

  private addOlFeatures(olFeatures: OlFeature[], motion: FeatureMotion) {
    this.dataSource.ol.addFeatures(olFeatures);
    moveToFeatures(this.map, olFeatures, motion);
  }

  private createStyle(
    strokeRGBA: [number, number, number, number] = [0, 161, 222, 1],
    strokeWidth: number = 2,
    fillRGBA: [number, number, number, number] = [0, 161, 222, 0.15],
    text?
  ): olstyle.Style {

    const stroke = new olstyle.Stroke({
      color: strokeRGBA,
      width: strokeWidth
    });

    const fill = new olstyle.Fill({
      color: fillRGBA
    });

    return new olstyle.Style({
      stroke: stroke,
      fill: fill,
      image: new olstyle.Circle({
        radius: 5,
        stroke: stroke,
        fill: fill
      }),
      text: new olstyle.Text({
        font: '12px Calibri,sans-serif',
        text: text,
        fill: new olstyle.Fill({ color: '#000' }),
        stroke: new olstyle.Stroke({ color: '#fff', width: 3 })
      })
    });
  }

  private createMarkerStyle(color = 'blue', text?): olstyle.Style {
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
        text: text,
        fill: new olstyle.Fill({ color: '#000' }),
        stroke: new olstyle.Stroke({ color: '#fff', width: 3 })
      })
    });
  }

}
