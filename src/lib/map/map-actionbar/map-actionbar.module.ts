import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoActionModule } from '@igo2/common';
import { IgoMapModule } from '@igo2/geo';

import { MapActionbarComponent } from './map-actionbar.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    IgoActionModule,
    IgoMapModule
  ],
  exports: [MapActionbarComponent],
  declarations: [MapActionbarComponent]
})
export class FadqLibMapActionbarModule {}
