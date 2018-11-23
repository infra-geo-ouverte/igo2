import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatGridListModule
} from '@angular/material';

import { EntityFormComponent } from './entity-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule
  ],
  exports: [EntityFormComponent],
  declarations: [EntityFormComponent]
})
export class FadqEntityFormModule {}
