import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatGridListModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientLegendComponent } from './client-legend.component';
import { ClientLegendItemComponent } from './client-legend-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatGridListModule,
    IgoLanguageModule
  ],
  exports: [
    ClientLegendComponent
  ],
  declarations: [
    ClientLegendComponent,
    ClientLegendItemComponent
  ]
})
export class FadqClientLegendModule {}
