import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule
} from '@angular/material';

import { ToolbarComponent } from './toolbar.component';
import { ToolbarItemComponent } from './toolbar-item.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
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
