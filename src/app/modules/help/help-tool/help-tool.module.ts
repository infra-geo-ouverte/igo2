import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatIconModule } from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { HelpToolComponent } from './help-tool.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    MatIconModule,
    IgoLanguageModule
  ],
  declarations: [HelpToolComponent],
  exports: [HelpToolComponent],
  entryComponents: [HelpToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqHelpToolModule {}
