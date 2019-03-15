import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoFormModule } from '@igo2/common';

import { ClientSchemaTransferFormComponent } from './client-schema-transfer-form.component';

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
    ClientSchemaTransferFormComponent
  ],
  declarations: [
    ClientSchemaTransferFormComponent
  ],
  entryComponents: [
    ClientSchemaTransferFormComponent
  ]
})
export class FadqLibClientSchemaTransferFormModule {}
