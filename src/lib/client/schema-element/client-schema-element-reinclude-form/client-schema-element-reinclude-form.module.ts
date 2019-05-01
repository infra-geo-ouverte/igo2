import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatIconModule,
  MatButtonModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoEntityTableModule, IgoFormModule } from '@igo2/common';

import {
  ClientSchemaElementReincludeFormComponent
} from './client-schema-element-reinclude-form.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    IgoLanguageModule,
    IgoFormModule,
    IgoEntityTableModule
  ],
  exports: [
    ClientSchemaElementReincludeFormComponent
  ],
  declarations: [
    ClientSchemaElementReincludeFormComponent
  ],
  entryComponents: [
    ClientSchemaElementReincludeFormComponent
  ]
})
export class FadqLibClientSchemaElementReincludeFormModule {}
