import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';
import { IgoEntitySelectorModule } from '@igo2/common';

import { ClientSchemaSelectorComponent } from './client-schema-selector.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    IgoLanguageModule,
    IgoEntitySelectorModule
  ],
  exports: [ClientSchemaSelectorComponent],
  declarations: [ClientSchemaSelectorComponent]
})
export class FadqLibClientSchemaSelectorModule {}
