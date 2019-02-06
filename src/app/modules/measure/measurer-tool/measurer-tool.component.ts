import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';

import { Register } from '@igo2/context';

import { FeatureStore } from 'src/lib/feature';
import { FeatureWithMeasure } from 'src/lib/measure';
import { IgoMap } from 'src/lib/map';
import { MapState } from 'src/app/modules/map/map.state';

import { MeasureState } from '../measure.state';
import { MeasurerToolOptions } from './measurer-tool.interfaces';

/**
 * Tool to measure lengths and areas
 */
@Register({
  name: 'measurer',
  title: 'tools.measurer',
  icon: 'straighten'
})
@Component({
  selector: 'fadq-measurer-tool',
  templateUrl: './measurer-tool.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MeasurerToolComponent {

  /**
   * Measurer tool options. At the moment, this needs to be defined
   * in order to be set by the toolbox component that contains it.
   */
  public options: MeasurerToolOptions = {} as MeasurerToolOptions;

  /**
   * Map to measure on
   * @internal
   */
  get store(): FeatureStore<FeatureWithMeasure> { return this.measureState.store; }

  /**
   * Map to measure on
   * @internal
   */
  get map(): IgoMap { return this.mapState.map; }

  constructor(
    private measureState: MeasureState,
    private mapState: MapState
  ) {}

}
