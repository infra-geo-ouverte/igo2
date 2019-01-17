import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import {
  MeasureType,
  MeasureAreaUnit,
  MeasureLengthUnit
} from '../shared/measure.interfaces';

/**
 * Measurer item
 */
@Component({
  selector: 'fadq-measurer-item',
  templateUrl: './measurer-item.component.html',
  styleUrls: ['./measurer-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurerItemComponent {

  /**
   * Measure type
   */
  @Input() measureType: MeasureType;

  /**
   * Measure unit
   */
  @Input() measureUnit: MeasureAreaUnit | MeasureLengthUnit;

  /**
   * Measure
   */
  @Input() measure: number;

  /**
   * Placeholder
   */
  @Input() placeholder: string;

  /**
   * Available measure units for the measure type given
   * @internal
   */
  get measureUnits(): string[] {
    if (this.measureType === MeasureType.Area) {
      return Object.values(MeasureAreaUnit);
    }
    return Object.values(MeasureLengthUnit);
  }

  constructor() {}

  /**
   * Set the measure type
   * @internal
   */
  onMeasureTypeChange(measureType: MeasureType) {
    this.measureType = measureType;
  }

  /**
   * Set the measure unit
   * @internal
   */
  onUnitChange(unit: MeasureAreaUnit | MeasureLengthUnit) {
    this.measureUnit = unit;
  }
}
