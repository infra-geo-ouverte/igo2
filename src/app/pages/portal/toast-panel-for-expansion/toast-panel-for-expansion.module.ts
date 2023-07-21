import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';

import { IgoPanelModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';

import { ToastPanelForExpansionComponent } from './toast-panel-for-expansion.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    IgoLanguageModule,
    IgoPanelModule,
    IgoStopPropagationModule
  ],
  exports: [ToastPanelForExpansionComponent],
  declarations: [ToastPanelForExpansionComponent]
})
export class AppToastPanelForExpansionModule {}
