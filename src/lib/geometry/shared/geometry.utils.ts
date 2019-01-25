import OlLineString from 'ol/geom/LineString';
import OlPolygon from 'ol/geom/Polygon';

/**
 * Split geometry into two
 * @param olFeature OL feature
 */
export function splitOlGeometry(
  olGeometry: OlLineString | OlPolygon,
  olSplitter: OlLineString
): [OlLineString | OlPolygon,  OlLineString | OlPolygon] {
  return [olGeometry, olGeometry.clone()];
}
