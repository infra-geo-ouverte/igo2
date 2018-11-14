import * as olstyle from 'ol/style';
import * as olextent from 'ol/extent';
import * as olproj from 'ol/proj';
import OlFeature from 'ol/Feature';

import { FeatureDataSource, VectorLayer } from '@igo2/geo';

import { featureToOl } from '../../feature/shared/feature.utils';
import { Feature } from '../../feature/shared/feature.interface';
import { OverlayAction } from './overlay.enum';

// Import from the index to avoid recursion
import { IgoMap } from '../../map';

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
      title: 'Overlay',
      zIndex: 999,
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

  setFeatures(features: Feature[], action: OverlayAction = OverlayAction.Default) {
    this.clear();
    this.addFeatures(features, action);
  }

  addFeature(feature: Feature, action: OverlayAction = OverlayAction.Default) {
    this.addFeatures([feature], action);
  }

  addFeatures(features: Feature[], action: OverlayAction = OverlayAction.Default) {
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

    this.addOlFeatures(olFeatures, action);
  }

  clear() {
    this.dataSource.ol.clear();
  }

  private addOlFeatures(olFeatures: OlFeature[], action: OverlayAction) {
    this.dataSource.ol.addFeatures(olFeatures);

    const extent = this.computeOlFeaturesExtent(olFeatures);
    if (action === OverlayAction.Zoom) {
      this.map.zoomToExtent(extent);
    } else if (action === OverlayAction.Move) {
      this.map.moveToExtent(extent);
    } else if (action === OverlayAction.Default) {
      if (this.featuresAreOutOfView(extent) || this.featuresAreTooDeepInView(extent)) {
        this.map.zoomToExtent(extent);
      }
    }
  }

  private computeOlFeaturesExtent(olFeatures: OlFeature[]): [number, number, number, number] {
    const extent = olextent.createEmpty();

    olFeatures.forEach((olFeature: OlFeature) => {
      const olGeometry = olFeature.getGeometry();
      const featureExtent = this.computeOlFeatureExtent(olFeature);
      if (olextent.isEmpty(featureExtent) && olGeometry !== null) {
        olextent.extend(featureExtent, olGeometry.getExtent());
      }
      olextent.extend(extent, featureExtent);
    });

    return extent;
  }

  private computeOlFeatureExtent(olFeature: OlFeature): [number, number, number, number] {
    let extent = olextent.createEmpty();

    const olFeatureExtent = olFeature.get('extent');
    const olFeatureProjection = olFeature.get('projection');
    if (olFeatureExtent !== undefined && olFeatureProjection !== undefined) {
      extent = olproj.transformExtent(
        olFeatureExtent,
        olFeatureProjection,
        this.map.projection
      );
    }

    return extent;
  }

  /**
   * Return true if features are out of view.
   *
   * If features are too close to the edge, they are considered out of view.
   * We define the edge as 5% of the extent height.
   */
  private featuresAreOutOfView(featuresExtent: [number, number, number, number]) {
    const mapExtent = this.map.getExtent();
    const mapExtentHeight = olextent.getHeight(mapExtent);
    const edgeRatio = 0.05;
    const viewExtent = olextent.buffer(mapExtent, mapExtentHeight * edgeRatio * -1);

    return !olextent.containsExtent(viewExtent, featuresExtent);
  }

  /**
   * Return true if features are too deep into the view. This results
   * in features being too small.
   *
   * Features are considered too small if their extent occupies less than
   * 1% of the map extent.
   */
  private featuresAreTooDeepInView(featuresExtent: [number, number, number, number]) {
    const mapExtent = this.map.getExtent();
    const mapExtentArea = olextent.getArea(mapExtent);
    const featuresExtentArea = olextent.getArea(featuresExtent);
    const areaRatio = 0.01;

    return (featuresExtentArea / mapExtentArea) < areaRatio;
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
