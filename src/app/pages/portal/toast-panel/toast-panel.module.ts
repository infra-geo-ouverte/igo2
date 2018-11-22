import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import {
  IgoPanelModule,
  IgoStopPropagationModule
} from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';
import { IgoFeatureModule } from '@igo2/geo';

import { ToastPanelComponent } from './toast-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    IgoLanguageModule,
    IgoPanelModule,
    IgoStopPropagationModule,
    IgoFeatureModule
  ],
  exports: [ToastPanelComponent],
  declarations: [ToastPanelComponent]
})
export class FadqToastPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqToastPanelModule
    };
  }
}
