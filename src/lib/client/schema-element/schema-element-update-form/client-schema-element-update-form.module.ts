import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatTabsModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { FadqLibFeatureFormModule } from 'src/lib/feature/feature-form/feature-form.module';

import {
  ClientSchemaElementUpdateFormComponent
} from './client-schema-element-update-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatTabsModule,
    IgoLanguageModule,
    FadqLibFeatureFormModule
  ],
  exports: [
    ClientSchemaElementUpdateFormComponent
  ],
  declarations: [
    ClientSchemaElementUpdateFormComponent
  ],
  entryComponents: [
    ClientSchemaElementUpdateFormComponent
  ]
})
export class FadqLibClientSchemaElementUpdateFormModule {}
