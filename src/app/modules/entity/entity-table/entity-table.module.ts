import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatSortModule,
} from '@angular/material';

import { EntityTableComponent } from './entity-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule
  ],
  exports: [EntityTableComponent],
  declarations: [EntityTableComponent]
})
export class FadqEntityTableModule {}
