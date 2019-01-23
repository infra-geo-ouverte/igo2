
export const MEASURE_UNIT_AUTO = 'auto';

export enum MeasureType {
  Length = 'length',
  Area = 'area'
}

export enum MeasureLengthUnit {
  Meters = 'meters',
  Kilometers = 'kilometers',
  Miles = 'miles',
  Feet = 'feet'
}

export const MeasureLengthUnitAbbreviation = {
  [MeasureLengthUnit.Meters]: 'm',
  [MeasureLengthUnit.Kilometers]: 'km',
  [MeasureLengthUnit.Miles]: 'mi',
  [MeasureLengthUnit.Feet]: 'ft'
};

export enum MeasureAreaUnit {
  SquareMeters = 'squareMeters',
  SquareKilometers = 'squareKilometers',
  SquareMiles = 'squareMiles',
  SquareFeet = 'squareFeet',
  Hectares = 'hectares',
  Acres = 'acres'
}

export const MeasureAreaUnitAbbreviation = {
  [MeasureAreaUnit.SquareMeters]: 'm²',
  [MeasureAreaUnit.SquareKilometers]: 'km²',
  [MeasureAreaUnit.SquareMiles]: 'mi²',
  [MeasureAreaUnit.SquareFeet]: 'ft²',
  [MeasureAreaUnit.Hectares]: 'ha',
  [MeasureAreaUnit.Acres]: 'ac'
};
