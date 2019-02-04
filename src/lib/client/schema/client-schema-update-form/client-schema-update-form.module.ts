import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibFormModule } from 'src/lib/form/form.module';
import { ClientSchemaUpdateFormComponent } from './client-schema-update-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    IgoLanguageModule,
    FadqLibFormModule
  ],
  exports: [
    ClientSchemaUpdateFormComponent
  ],
  declarations: [
    ClientSchemaUpdateFormComponent
  ],
  entryComponents: [
    ClientSchemaUpdateFormComponent
  ]
})
export class FadqLibClientSchemaUpdateFormModule {}
