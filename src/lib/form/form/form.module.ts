import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    FormComponent
  ]
})
export class FadqLibFormFormModule {}
