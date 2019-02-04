import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { FadqLibDynamicOutletModule } from 'src/lib/common/dynamic-outlet/dynamic-outlet.module';

import { FormFieldComponent } from './form-field.component';
import { FormFieldSelectComponent } from './form-field-select.component';
import { FormFieldTextComponent } from './form-field-text.component';

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
    MatInputModule,
    MatSelectModule,
    FadqLibDynamicOutletModule
  ],
  exports: [
    FormFieldComponent,
    FormFieldSelectComponent,
    FormFieldTextComponent
  ],
  declarations: [
    FormFieldComponent,
    FormFieldSelectComponent,
    FormFieldTextComponent
  ]
})
export class FadqLibFormFieldModule {}
