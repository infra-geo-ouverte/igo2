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

import { InfoPanelComponent } from './info-panel.component';

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
  exports: [InfoPanelComponent],
  declarations: [InfoPanelComponent]
})
export class FadqInfoPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqInfoPanelModule
    };
  }
}
