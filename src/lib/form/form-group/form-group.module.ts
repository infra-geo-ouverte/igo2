import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatGridListModule
} from '@angular/material';

import { FadqLibFormFieldModule } from '../form-field/form-field.module';
import { FormGroupComponent } from './form-group.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatGridListModule,
    FadqLibFormFieldModule
  ],
  exports: [
    FormGroupComponent
  ],
  declarations: [
    FormGroupComponent
  ]
})
export class FadqLibFormGroupModule {}
