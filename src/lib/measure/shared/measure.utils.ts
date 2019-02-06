import * as olstyle from 'ol/style';
import OlGeometry from 'ol/geom/Geometry';
import OlPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import OlPolygon from 'ol/geom/Polygon';
import OlOverlay from 'ol/Overlay';
import { getLength, getArea } from 'ol/sphere';

import { Measure } from './measure.interfaces';
import {
  MeasureAreaUnit,
  MeasureAreaUnitAbbreviation,
  MeasureLengthUnit,
  MeasureLengthUnitAbbreviation
} from './measure.enum';

/**
 * Convert value from meters to kilometers
 * @param value Value in meters
 * @returns Value in kilometers
 */
export function metersToKilometers(value: number): number {
  return value * 0.001;
}

/**
 * Convert value from meters to feet
 * @param value Value in meters
 * @returns Value in feet
 */
export function metersToFeet(value: number): number {
  return value * 3.2808;
}

/**
 * Convert value from meters to miles
 * @param value Value in meters
 * @returns Value in miles
 */
export function metersToMiles(value: number): number {
  return value * 0.000621;
}

/**
 * Convert value from square meters to square kilometers
 * @param value Value in square meters
 * @returns Value in square kilometers
 */
export function squareMetersToSquareKilometers(value: number): number {
  return value * 0.000001;
}

/**
 * Convert value from square meters to square miles
 * @param value Value in square meters
 * @returns Value in square miles
 */
export function squareMetersToSquareMiles(value: number): number {
  return value * 0.0000003861;
}

/**
 * Convert value from square meters to square feet
 * @param value Value in square meters
 * @returns Value in square feet
 */
export function squareMetersToSquareFeet(value: number): number {
  return value * 10.764;
}

/**
 * Convert value from square meters to hectares
 * @param value Value in square meters
 * @returns Value in hectares
 */
export function squareMetersToHectares(value: number): number {
  return value * 0.0001;
}

/**
 * Convert value from square meters to acres
 * @param value Value in square meters
 * @returns Value in acres
 */
export function squareMetersToAcres(value: number): number {
  return value * 0.00024711;
}

/**
 * Convert value from meters to the specified length unit
 * @param value Value in meters
 * @param unit Length unit
 * @returns Value in unit
 */
export function metersToUnit(value: number, unit: MeasureLengthUnit): number | undefined {
  const conversionMapper = new Map([
    [MeasureLengthUnit.Meters, (val: number) => val],
    [MeasureLengthUnit.Kilometers, metersToKilometers],
    [MeasureLengthUnit.Miles, metersToMiles],
    [MeasureLengthUnit.Feet, metersToFeet],
  ]);
  const conversion = conversionMapper.get(unit);

  return conversion ? conversion(value) : undefined;
}

/**
 * Convert value from square meters to the specified area unit
 * @param value Value in meters
 * @param unit Area unit
 * @returns Value in unit
 */
export function squareMetersToUnit(value: number, unit: MeasureAreaUnit): number | undefined {
  const conversionMapper = new Map([
    [MeasureAreaUnit.SquareMeters, (val: number) => val],
    [MeasureAreaUnit.SquareKilometers, squareMetersToSquareKilometers],
    [MeasureAreaUnit.SquareMiles, squareMetersToSquareMiles],
    [MeasureAreaUnit.SquareFeet, squareMetersToSquareFeet],
    [MeasureAreaUnit.Hectares, squareMetersToHectares],
    [MeasureAreaUnit.Acres, squareMetersToAcres],
  ]);
  const conversion = conversionMapper.get(unit);

  return conversion ? conversion(value) : undefined;
}

/**
 * This method format a measure to a readable format
 * @param measure Measure
 * @param options Formatting options
 * @returns Formatted measure
 */
export function formatMeasure(measure: number, options?: {
  decimal?: number;
  unit?: MeasureAreaUnit | MeasureLengthUnit;
  unitAbbr?: boolean;
  locale?: string;
}) {
  let decimal = options.decimal;
  if (decimal === undefined || decimal < 0) {
    decimal = 1;
  }

  const parts = [];
  if (options.locale !== undefined) {
    parts.push(measure.toLocaleString(options.locale, {
      minimumFractionDigits: decimal,
      maximumFractionDigits: decimal
    }));
  } else {
    parts.push(measure.toFixed(decimal).toString());
  }

  if (options.unit !== undefined && options.unitAbbr === true) {
    parts.push(
      MeasureLengthUnitAbbreviation[options.unit] ||
      MeasureAreaUnitAbbreviation[options.unit]
    );
  }

  return parts.filter(p => p !== undefined).join(' ');
}

/**
 * Compute best length measure unit for a given measure in meters
 * @param value Value in meters
 * @returns Measure unit
 */
export function computeBestLengthUnit(value: number): MeasureLengthUnit {
  let unit = MeasureLengthUnit.Meters;
  let converted = value;
  const possibleUnits = [MeasureLengthUnit.Kilometers];
  while (converted > 1000 && possibleUnits.length > 0) {
    unit = possibleUnits.pop();
    converted = metersToUnit(value, unit);
  }
  return unit;
}

/**
 * Compute best length measure unit for a given measure in square meters
 * @param value Value in meters
 * @returns Measure unit
 */
export function computeBestAreaUnit(value: number): MeasureAreaUnit {
  let unit = MeasureAreaUnit.SquareMeters;
  let converted = value;
  const possibleUnits = [MeasureAreaUnit.SquareKilometers];
  while (converted > 1000000 && possibleUnits.length > 0) {
    unit = possibleUnits.pop();
    converted = squareMetersToUnit(value, unit);
  }
  return unit;
}

/**
 * Create a default style for a measure interaction
 * @returns OL style
 */
export function createMeasureInteractionStyle(): olstyle.Style {
  return new olstyle.Style({
    stroke: new olstyle.Stroke({
      color: '#ffcc33',
      lineDash: [10, 10],
      width: 2
    }),
    fill:  new olstyle.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    image: new olstyle.Circle({
      radius: 5,
      stroke: new olstyle.Stroke({
        color: '#ffcc33',
      }),
      fill: new olstyle.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      })
    })
  });
}

/**
 * Create a default style for a measure layer
 * @returns OL style
 */
export function createMeasureLayerStyle(): olstyle.Style {
  return new olstyle.Style({
    stroke: new olstyle.Stroke({
      color: '#ffcc33',
      width: 2
    }),
    fill:  new olstyle.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    })
  });
}

/**
 * Compute the length in meters of an OL geometry with a given projection
 * @param olGeometry Ol geometry
 * @param projection olGeometry's projection
 * @returns Length in meters
 */
export function measureOlGeometryLength(olGeometry: OlGeometry, projection: string): number | undefined {
  if (olGeometry instanceof OlPoint) {
    return undefined;
  }
  return getLength(olGeometry, {projection});
}

/**
 * Compute the area in square meters of an OL geometry with a given projection
 * @param olGeometry Ol geometry
 * @param projection olGeometry's projection
 * @returns Area in square meters
 */
export function measureOlGeometryArea(olGeometry: OlGeometry, projection: string): number | undefined {
  if (olGeometry instanceof OlPoint || olGeometry instanceof OlLineString) {
    return undefined;
  }
  return getArea(olGeometry, {projection});
}

/**
 * Compute the area (square meters), length (meters) and last length (meters)
 * of an OL geometry with a given projection.
 * @param olGeometry Ol geometry
 * @param projection olGeometry's projection
 * @returns Computed measure
 */
export function measureOlGeometry(olGeometry: OlGeometry, projection: string): Measure {
  const length = measureOlGeometryLength(olGeometry, projection);
  const area = measureOlGeometryArea(olGeometry, projection);

  const lengths = [];
  const coordinates = olGeometry.flatCoordinates;
  const coordinatesLength = coordinates.length;
  for (let i = 0; i <= coordinatesLength - 4; i += 2) {
    const olSegment = new OlLineString([
      [coordinates[i], coordinates[i + 1]],
      [coordinates[i + 2], coordinates[i + 3]]
    ]);

    lengths.push(measureOlGeometryLength(olSegment, projection));
  }

  return {
    area,
    length,
    lengths
  };
}

/**
 * Update an OL geometry midpoints and return an array of those points
 * @param olGeometry OL Geometry
 * @returns OL points
 */
export function updateOlGeometryMidpoints(olGeometry: OlLineString | OlPolygon): OlPoint[] {
  const olMidpoints = getOlGeometryMidpoints(olGeometry);

  // TODO: handle multi geometries
  const coordinates = olGeometry.flatCoordinates;
  const midpointsLength = olMidpoints.length;
  for (let i = 0; i < midpointsLength; i++) {
    const j = i * 2;
    const olSegment = new OlLineString([
      [coordinates[j], coordinates[j + 1]],
      [coordinates[j + 2], coordinates[j + 3]]
    ]);

    const midpointCoordinate = olSegment.getCoordinateAt(0.5);
    const olMidpoint = olMidpoints[i];
    if (olMidpoint !== undefined) {
      olMidpoint.setCoordinates(midpointCoordinate);
    } else {
      olMidpoints[i] = new OlPoint(midpointCoordinate);
    }
  }
  return olMidpoints;
}

/**
 * Return an array of  OL geometry midpoints, if any
 * @param olGeometry OL Geometry
 * @returns OL points
 */
export function getOlGeometryMidpoints(olGeometry: OlLineString | OlPolygon): OlPoint[] {
  const expectedNumber = (olGeometry.flatCoordinates.length / 2) - 1;

  // TODO: To myself: This is for demo puposes. Clean this mess!!!
  // And make a Tooltip class  to handle those things.
  let olMidpoints = olGeometry.get('midpoints');
  if (olMidpoints === undefined) {
    olMidpoints = new Array(expectedNumber);
    olGeometry.set('midpoints', olMidpoints, true);
  } else {
    if (expectedNumber > olMidpoints.length) {
      olMidpoints.push(...new Array(expectedNumber - olMidpoints.length));
    } else if (expectedNumber < olMidpoints.length) {
      for (let i = expectedNumber; i < olMidpoints.length; i++) {
        const olMidpoint = olMidpoints[expectedNumber];
        if (olMidpoint !== undefined) {
          const olTooltip = olMidpoint.get('tooltip');
          if (olTooltip !== undefined) {
            const olMap = olTooltip.getMap();
            if (olMap !== undefined) {
              olMap.removeOverlay(olTooltip);
            }
          }
        }
      }
      olMidpoints.splice(expectedNumber);
    }
  }

  return olMidpoints;
}

/**
 * Add an OL overlay at each midpoint and return an array of those overlays
 * @param olGeometry OL Geometry
 * @returns OL overlays
 */
export function updateOlTooltipsAtMidpoints(olGeometry: OlLineString | OlPolygon): OlOverlay[] {
  const olMidpoints = updateOlGeometryMidpoints(olGeometry);
  const olTooltips = olMidpoints.map((olMidpoint: OlPoint) => {
    let olTooltip = olMidpoint.get('tooltip');
    if (olTooltip === undefined) {
      olTooltip = new OlOverlay({
        element: document.createElement('div'),
        offset: [0, 15],
        positioning: 'bottom-center',
        className: [
          'fadq-map-tooltip',
          'fadq-map-tooltip-measure',
          'fadq-map-tooltip-measure-bottom'
        ].join(' '),
        stopEvent: false
      });
      olMidpoint.set('tooltip', olTooltip, true);
    }
    olTooltip.setPosition(olMidpoint.flatCoordinates);

    return olTooltip;
  });
  return olTooltips;
}

/**
 * Return an array of OL overlay at midspoints, if any
 * @param olGeometry OL Geometry
 * @returns OL overlays
 */
export function getOlTooltipsAtMidpoints(olGeometry: OlLineString | OlPolygon): OlOverlay[] {
  const olMidpoints = getOlGeometryMidpoints(olGeometry);
  return olMidpoints.map((olMidpoint: OlPoint) => {
    return olMidpoint ? olMidpoint.get('tooltip') : undefined;
  });
}
