import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientParcelLegendComponent } from './client-parcel-legend.component';
import { ClientParcelLegendItemComponent } from './client-parcel-legend-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    IgoLanguageModule
  ],
  exports: [
    ClientParcelLegendComponent
  ],
  declarations: [
    ClientParcelLegendComponent,
    ClientParcelLegendItemComponent
  ]
})
export class FadqClientParcelLegendModule {}
