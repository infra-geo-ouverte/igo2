import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTabsModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoFeatureFormModule } from '@igo2/geo';

import {
  ClientSchemaElementCreateFormComponent
} from './client-schema-element-create-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    IgoLanguageModule,
    IgoFeatureFormModule
  ],
  exports: [
    ClientSchemaElementCreateFormComponent
  ],
  declarations: [
    ClientSchemaElementCreateFormComponent
  ],
  entryComponents: [
    ClientSchemaElementCreateFormComponent
  ]
})
export class FadqLibClientSchemaElementCreateFormModule {}
