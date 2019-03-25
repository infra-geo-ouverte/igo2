import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoFormModule } from '@igo2/common';

import { ClientSchemaElementImportDataComponent } from './client-schema-element-import-data.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    IgoLanguageModule,
    IgoFormModule
  ],
  exports: [
    ClientSchemaElementImportDataComponent
  ],
  declarations: [
    ClientSchemaElementImportDataComponent
  ],
  entryComponents: [
    ClientSchemaElementImportDataComponent
  ]
})
export class FadqLibClientSchemaElementImportDataModule {}
