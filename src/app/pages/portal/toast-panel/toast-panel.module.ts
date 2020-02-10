import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule
} from '@angular/material';

import { IgoPanelModule, IgoStopPropagationModule, IgoActionModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';
import { IgoFeatureModule, IgoSearchResultsModule } from '@igo2/geo';

import { ToastPanelComponent } from './toast-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    IgoLanguageModule,
    IgoPanelModule,
    IgoStopPropagationModule,
    IgoActionModule,
    IgoFeatureModule,
    IgoSearchResultsModule
  ],
  exports: [ToastPanelComponent],
  declarations: [ToastPanelComponent]
})
export class AppToastPanelModule {}
