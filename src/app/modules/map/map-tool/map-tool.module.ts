import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  MatTooltipModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoLayerModule } from '@igo2/geo';
import { IgoContextManagerModule } from '@igo2/context';

import { MapToolComponent } from './map-tool.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    IgoLanguageModule,
    IgoLayerModule,
    IgoContextManagerModule
  ],
  declarations: [MapToolComponent],
  exports: [MapToolComponent],
  entryComponents: [MapToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqMapToolModule {}
