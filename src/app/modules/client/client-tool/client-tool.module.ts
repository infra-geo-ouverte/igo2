import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoLanguageModule } from '@igo2/core';
import { IgoListModule, IgoCollapsibleModule } from '@igo2/common';

import { FadqLibClientModule } from 'src/lib/client/client.module';

import { ClientToolComponent } from './client-tool.component';

@NgModule({
  imports: [
    CommonModule,
    IgoLanguageModule,
    IgoListModule,
    IgoCollapsibleModule,
    FadqLibClientModule
  ],
  declarations: [ClientToolComponent],
  exports: [ClientToolComponent],
  entryComponents: [ClientToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqClientToolModule {}
