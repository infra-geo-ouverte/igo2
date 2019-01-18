export interface GeometryMeasures {
  area?: number;
  length?: number;
  lengths?: number[];
}

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

export enum MeasureAreaUnit {
  SquareMeters = 'squareMeters',
  SquareKilometers = 'squareKilometers',
  SquareMiles = 'squareMiles',
  SquareFeet = 'squareFeet',
  Hectares = 'hectares',
  Acres = 'acres'
}
