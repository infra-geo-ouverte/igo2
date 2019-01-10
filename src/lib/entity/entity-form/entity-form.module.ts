import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatIconModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule
} from '@angular/material';

import { EntityFormComponent } from './entity-form.component';
import { EntityFormFieldComponent } from './entity-form-field.component';
import { EntityFormFieldGeometryInputComponent } from './entity-form-field-geometry-input.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule
  ],
  exports: [EntityFormComponent],
  declarations: [
    EntityFormComponent,
    EntityFormFieldComponent,
    EntityFormFieldGeometryInputComponent
  ]
})
export class FadqLibEntityFormModule {}
