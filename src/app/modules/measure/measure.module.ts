import { NgModule } from '@angular/core';

import { FadqMeasurerToolModule } from './measurer-tool/measurer-tool.module';

import { MeasureState } from './measure.state';

@NgModule({
  imports: [],
  declarations: [],
  exports: [
    FadqMeasurerToolModule
  ],
  providers: [
    MeasureState
  ]
})
export class FadqMeasureModule {}
