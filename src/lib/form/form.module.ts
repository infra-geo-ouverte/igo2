import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibFormFormModule } from './form/form.module';
import { FadqLibFormGroupModule } from './form-group/form-group.module';
import { FadqLibFormFieldModule } from './form-field/form-field.module';
import { FormFieldSelectComponent } from './form-field/form-field-select.component';
import { FormFieldTextComponent } from './form-field/form-field-text.component';
import { FormService } from './shared/form.service';
import { FormFieldService } from './shared/form-field.service';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibFormGroupModule,
    FadqLibFormFieldModule
  ],
  exports: [
    FadqLibFormFormModule,
    FadqLibFormGroupModule,
    FadqLibFormFieldModule
  ],
  declarations: [],
  providers: [
    FormService,
    FormFieldService
  ],
  entryComponents: [
    FormFieldSelectComponent,
    FormFieldTextComponent
  ]
})
export class FadqLibFormModule {}
