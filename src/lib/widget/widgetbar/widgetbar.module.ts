import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { WidgetbarComponent } from './widgetbar.component';
import { WidgetbarItemComponent } from './widgetbar-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule,
    IgoLanguageModule
  ],
  exports: [
    WidgetbarComponent
  ],
  declarations: [
    WidgetbarComponent,
    WidgetbarItemComponent
  ]
})
export class FadqLibWidgetbarModule {}
