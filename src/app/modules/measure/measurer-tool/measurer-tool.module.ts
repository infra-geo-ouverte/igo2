import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FadqLibMeasurerModule } from 'src/lib/measure/measurer/measurer.module';

import { MeasurerToolComponent } from './measurer-tool.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    FadqLibMeasurerModule
  ],
  declarations: [MeasurerToolComponent],
  exports: [MeasurerToolComponent],
  entryComponents: [MeasurerToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqMeasurerToolModule {}
