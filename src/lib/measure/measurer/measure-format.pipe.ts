import { Pipe, PipeTransform } from '@angular/core';

import { MeasureAreaUnit, MeasureLengthUnit } from '../shared/measure.enum';
import { metersToUnit, squareMetersToUnit, formatMeasure } from '../shared/measure.utils';

/**
 * This pipe returns a measure converted from meters (or square meters)
 * to the specified unit. It also keeps a certain number of decimals.
 */
@Pipe({
  name: 'measureFormat'
})
export class MeasureFormatPipe implements PipeTransform {

  /**
   * @ignore
   */
  transform(value: number, unit: MeasureAreaUnit | MeasureLengthUnit, decimal: number = 1): number {
    let out;
    if (Object.values(MeasureAreaUnit).indexOf(unit) >= 0) {
      out = squareMetersToUnit(value, unit as MeasureAreaUnit);
    } else if (Object.values(MeasureLengthUnit).indexOf(unit) >= 0) {
      out = metersToUnit(value, unit as MeasureLengthUnit);
    }

    return out ? formatMeasure(out, {
      decimal: 1,
      unit: unit,
      unitAbbr: false,
      locale: 'fr'
    }) : out;
  }
}
