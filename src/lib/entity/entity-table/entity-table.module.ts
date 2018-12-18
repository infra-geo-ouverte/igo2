import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTableModule,
  MatSortModule,
  MatIconModule
} from '@angular/material';

import { EntityTableRowDirective } from './entity-table-row.directive';
import { EntityTableComponent } from './entity-table.component';

@NgModule({
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule
  ],
  exports: [
    EntityTableComponent
  ],
  declarations: [
    EntityTableComponent,
    EntityTableRowDirective
  ]
})
export class FadqLibEntityTableModule {}
