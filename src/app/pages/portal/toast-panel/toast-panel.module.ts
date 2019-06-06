import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatButtonModule } from '@angular/material';

import { IgoPanelModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';
import { IgoFeatureModule, IgoSearchResultsModule } from '@igo2/geo';

import { ToastPanelComponent } from './toast-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    IgoLanguageModule,
    IgoPanelModule,
    IgoStopPropagationModule,
    IgoFeatureModule,
    IgoSearchResultsModule
  ],
  exports: [ToastPanelComponent],
  declarations: [ToastPanelComponent]
})
export class AppToastPanelModule {}
