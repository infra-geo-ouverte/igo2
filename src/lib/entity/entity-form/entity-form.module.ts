import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatGridListModule
} from '@angular/material';

import { EntityFormComponent } from './entity-form.component';
import { EntityFormFieldComponent } from './entity-form-field.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule
  ],
  exports: [EntityFormComponent],
  declarations: [
    EntityFormComponent,
    EntityFormFieldComponent
  ]
})
export class FadqLibEntityFormModule {}
