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
import { IgoListModule } from '@igo2/common';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarItemComponent } from './toolbar-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule,
    IgoLanguageModule,
    IgoListModule
  ],
  exports: [
    ToolbarComponent
  ],
  declarations: [
    ToolbarComponent,
    ToolbarItemComponent
  ]
})
export class FadqToolbarModule {}
