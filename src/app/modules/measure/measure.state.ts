import { Injectable } from '@angular/core';

import { FeatureStore } from 'src/lib/feature';
import { FeatureWithMeasure } from 'src/lib/measure';

/**
 * Service that holds the state of the measure module
 */
@Injectable({
  providedIn: 'root'
})
export class MeasureState {

  /**
   * Store that holds the measures
   */
  public store: FeatureStore<FeatureWithMeasure> = new  FeatureStore<FeatureWithMeasure>();

}
