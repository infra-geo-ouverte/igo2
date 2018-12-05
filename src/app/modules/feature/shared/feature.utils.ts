import OlFeature from 'ol/Feature';
import OlFormatGeoJSON from 'ol/format/GeoJSON';

import { Feature } from './feature.interfaces';

export function featureToOl(feature: Feature, projectionOut: string): OlFeature {
  const olFormat = new OlFormatGeoJSON();
  const olFeature = olFormat.readFeature(feature, {
    dataProjection: feature.projection,
    featureProjection: projectionOut
  });

  if (feature.projection !== undefined) {
    olFeature.set('projection', feature.projection);
  }

  if (feature.extent !== undefined) {
    olFeature.set('extent', feature.extent);
  }

  return olFeature;
}
