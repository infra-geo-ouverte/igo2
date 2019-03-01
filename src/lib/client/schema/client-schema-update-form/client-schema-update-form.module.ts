import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoFormModule } from '@igo2/common';

import { ClientSchemaUpdateFormComponent } from './client-schema-update-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    IgoLanguageModule,
    IgoFormModule
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
