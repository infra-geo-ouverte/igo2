import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule
} from '@angular/material';

import { IgoStopPropagationModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';
import { IgoGeoModule } from '@igo2/geo';

import { FadqToolbarModule } from '../../common/toolbar/toolbar.module';
import { MapToolbarComponent } from './map-toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatMenuModule,
    IgoStopPropagationModule,
    IgoLanguageModule,
    IgoGeoModule,
    FadqToolbarModule
  ],
  exports: [MapToolbarComponent],
  declarations: [MapToolbarComponent]
})
export class FadqMapToolbarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqMapToolbarModule
    };
  }
}
