import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import {
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatSortModule,
  MatCheckboxModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { EntityTableComponent } from './entity-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CdkTableModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCheckboxModule,
    IgoLanguageModule
  ],
  exports: [EntityTableComponent],
  declarations: [EntityTableComponent]
})
export class FadqEntityTableModule {}
