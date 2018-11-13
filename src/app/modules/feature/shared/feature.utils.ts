import OlFeature from 'ol/Feature';
import OlFormatGeoJSON from 'ol/format/GeoJSON';

import { Entity } from '../../entity/shared/entity.interface';
import { FEATURE } from './feature.enum';
import { Feature } from './feature.interface';

export function getFeatureFromEntity(entity: Entity): Feature | undefined {
  if (entity.meta.dataType !== FEATURE) {
    return undefined;
  }
  return (entity as Entity<Feature>).data;
}

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
