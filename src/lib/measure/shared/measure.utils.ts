import OlGeometry from 'ol/geom/Geometry';
import OlPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import { getLength, getArea } from 'ol/sphere';

import {
  MeasureAreaUnit,
  MeasureLengthUnit,
  GeometryMeasures
} from './measure.interfaces';

/**
 * Compute the length in meters of an OL geometry with a given projection
 * @param olGeometry Ol geometry
 * @param projection olGeometry's projection
 * @returns Length in meters
 */
export function measureGeometryLength(olGeometry: OlGeometry, projection: string): number | undefined {
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
export function measureGeometryArea(olGeometry: OlGeometry, projection: string): number | undefined {
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
 * @returns Computed measures
 */
export function measureGeometry(olGeometry: OlGeometry, projection: string): GeometryMeasures {
  const lastCoordinate = olGeometry.getLastCoordinate();

  const length = measureGeometryLength(olGeometry, projection);
  const area = measureGeometryArea(olGeometry, projection);
  let lastLength = length;

  const flatCoordinates = olGeometry.flatCoordinates;
  const flatCoordinatesLength = flatCoordinates.length;
  if (flatCoordinatesLength >= 4) {
    const previousCoordinate = flatCoordinates.slice(
      flatCoordinatesLength - 4,
      flatCoordinatesLength - 2
    );
    const lastSegment = new OlLineString([previousCoordinate, lastCoordinate]);
    lastLength = measureGeometryLength(lastSegment, projection);
  }

  return {
    area,
    length,
    lastLength
  };
}

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
