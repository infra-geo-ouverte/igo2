import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientSchemaSelectorComponent } from './client-schema-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule,
    IgoLanguageModule
  ],
  exports: [ClientSchemaSelectorComponent],
  declarations: [ClientSchemaSelectorComponent]
})
export class FadqClientSchemaSelectorModule {}
