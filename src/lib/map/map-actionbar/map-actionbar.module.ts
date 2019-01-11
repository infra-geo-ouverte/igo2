import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoGeoModule } from '@igo2/geo';

import { FadqLibActionModule } from '../../action/action.module';
import { MapActionbarComponent } from './map-actionbar.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    IgoGeoModule,
    FadqLibActionModule
  ],
  exports: [MapActionbarComponent],
  declarations: [MapActionbarComponent]
})
export class FadqLibMapActionbarModule {}
