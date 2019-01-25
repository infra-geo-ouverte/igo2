import OlLineString from 'ol/geom/LineString';
import OlPolygon from 'ol/geom/Polygon';

/**
 * Split geometry into two
 * @param olGeometry OL feature
 */
export function sliceOlGeometry(
  olGeometry: OlLineString | OlPolygon,
  olSlicer: OlLineString
): Array<OlLineString | OlPolygon> {
  if (olGeometry instanceof OlPolygon) {
    return sliceOlPolygon(olGeometry, olSlicer);
  } else if (olGeometry instanceof OlLineString) {
    return sliceOlLineString(olGeometry, olSlicer);
  }
  return [];
}

/**
 * Slice OL LineString into one or more polygons
 * @param olLineString OL polygon
 */
export function sliceOlLineString(olLineString: OlLineString, olSlicer: OlLineString): OlLineString[] {
  return [];
}

/**
 * Slice OL Polygon into one or more polygons
 * @param olPolygon OL polygon
 */
export function sliceOlPolygon(olPolygon: OlPolygon, olSlicer: OlLineString): OlPolygon[] {
  return [];
}
