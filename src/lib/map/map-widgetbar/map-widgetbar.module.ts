import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoGeoModule } from '@igo2/geo';

import { FadqLibWidgetModule } from '../../widget/widget.module';
import { MapWidgetbarComponent } from './map-widgetbar.component';

@NgModule({
  imports: [
    CommonModule,
    IgoGeoModule,
    FadqLibWidgetModule
  ],
  exports: [MapWidgetbarComponent],
  declarations: [MapWidgetbarComponent]
})
export class FadqLibMapWidgetbarModule {}
