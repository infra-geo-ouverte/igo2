
import * as olextent from 'ol/extent';
import * as olproj from 'ol/proj';
import * as olstyle from 'ol/style';
import OlFeature from 'ol/Feature';
import OlFormatGeoJSON from 'ol/format/GeoJSON';

import { getEntityId, getEntityRevision } from 'src/lib/entity';
import { IgoMap } from 'src/lib/map';

import { FeatureMotion } from './feature.enum';
import { Feature } from './feature.interfaces';

export function featureToOl(feature: Feature, projectionOut: string): OlFeature {
  const olFormat = new OlFormatGeoJSON();
  const olFeature = olFormat.readFeature(feature, {
    dataProjection: feature.projection,
    featureProjection: projectionOut
  });

  olFeature.setId(getEntityId(feature));

  if (feature.projection !== undefined) {
    olFeature.set('projection', feature.projection);
  }

  if (feature.extent !== undefined) {
    olFeature.set('extent', feature.extent);
  }

  olFeature.set('entityRevision', getEntityRevision(feature));

  return olFeature;
}

export function computeOlFeatureExtent(
  map: IgoMap, olFeature: OlFeature
): [number, number, number, number] {
  let extent = olextent.createEmpty();

  const olFeatureExtent = olFeature.get('extent');
  const olFeatureProjection = olFeature.get('projection');
  if (olFeatureExtent !== undefined && olFeatureProjection !== undefined) {
    extent = olproj.transformExtent(
      olFeatureExtent,
      olFeatureProjection,
      map.projection
    );
  }

  return extent;
}

export function computeOlFeaturesExtent(
  map: IgoMap,
  olFeatures: OlFeature[]
): [number, number, number, number] {
  const extent = olextent.createEmpty();

  olFeatures.forEach((olFeature: OlFeature) => {
    const olGeometry = olFeature.getGeometry();
    const featureExtent = computeOlFeatureExtent(map, olFeature);
    if (olextent.isEmpty(featureExtent) && olGeometry !== null) {
      olextent.extend(featureExtent, olGeometry.getExtent());
    }
    olextent.extend(extent, featureExtent);
  });

  return extent;
}

/**
 * Scale an extent.
 */
export function scaleExtent(
  extent: [number, number, number, number],
  scale: number
): [number, number, number, number] {
  const [width, height] = olextent.getSize(extent);
  return [
    extent[0] - width * scale * 0.5,
    extent[1] - height * scale * 0.5,
    extent[2] + width * scale * 0.5,
    extent[3] + height * scale * 0.5
  ];
}

/**
 * Return true if features are out of view.
 *
 * If features are too close to the edge, they are considered out of view.
 * We define the edge as 5% of the extent size.
 */
export function featuresAreOutOfView(map: IgoMap, featuresExtent: [number, number, number, number]) {
  const mapExtent = map.getExtent();
  const edgeRatio = 0.05;
  const viewExtent = scaleExtent(mapExtent, edgeRatio * -1);

  return !olextent.containsExtent(viewExtent, featuresExtent);
}

/**
 * Return true if features are too deep into the view. This results
 * in features being too small.
 *
 * Features are considered too small if their extent occupies less than
 * 1% of the map extent.
 */
export function featuresAreTooDeepInView(map: IgoMap, featuresExtent: [number, number, number, number]) {
  const mapExtent = map.getExtent();
  const mapExtentArea = olextent.getArea(mapExtent);
  const featuresExtentArea = olextent.getArea(featuresExtent);
  const areaRatio = 0.01;

  return (featuresExtentArea / mapExtentArea) < areaRatio;
}

/**
 * Fit view to include the features extent.
 *
 * By default, this method will let the features occupy about 50% of the viewport.
 */
export function moveToFeatures(
  map: IgoMap,
  olFeatures: OlFeature[],
  motion = FeatureMotion.Default,
  scale = 1
) {
  const featuresExtent = computeOlFeaturesExtent(map, olFeatures);
  const viewExtent = scaleExtent(featuresExtent, scale);

  if (motion === FeatureMotion.Zoom) {
    map.delayedZoomToExtent(viewExtent);
  } else if (motion === FeatureMotion.Move) {
    map.delayedMoveToExtent(viewExtent);
  } else if (motion === FeatureMotion.Default) {
    if (featuresAreOutOfView(map, featuresExtent) || featuresAreTooDeepInView(map, featuresExtent)) {
      map.delayedZoomToExtent(viewExtent);
    }
  }
}

export function hideOlFeature(olFeature: OlFeature) {
  olFeature.setStyle(new olstyle.Style({}));
}
