import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

import { GeometryFormFieldComponent } from './geometry-form-field.component';
import { GeometryFormFieldInputComponent } from './geometry-form-field-input.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    GeometryFormFieldComponent,
    GeometryFormFieldInputComponent
  ],
  declarations: [
    GeometryFormFieldComponent,
    GeometryFormFieldInputComponent
  ]
})
export class FadqLibGeometryFormFieldModule {}
