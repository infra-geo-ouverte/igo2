import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule
} from '@angular/material';

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
