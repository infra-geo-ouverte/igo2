import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSlideToggleModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibEntityTableModule } from 'src/lib/entity/entity-table/entity-table.module';

import { MeasureFormatPipe } from './measure-format.pipe';
import { MeasurerItemComponent } from './measurer-item.component';
import { MeasurerComponent } from './measurer.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    IgoLanguageModule,
    FadqLibEntityTableModule
  ],
  declarations: [
    MeasureFormatPipe,
    MeasurerItemComponent,
    MeasurerComponent
  ],
  exports: [
    MeasureFormatPipe,
    MeasurerComponent
  ]
})
export class FadqLibMeasurerModule {}
