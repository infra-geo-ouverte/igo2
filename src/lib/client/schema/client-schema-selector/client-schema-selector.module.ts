import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ClientSchemaSelectorComponent } from './client-schema-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    IgoLanguageModule
  ],
  exports: [ClientSchemaSelectorComponent],
  declarations: [ClientSchemaSelectorComponent]
})
export class FadqLibClientSchemaSelectorModule {}
