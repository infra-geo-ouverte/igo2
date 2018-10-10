import {
  NgModule,
  ModuleWithProviders,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

import { ClientInfoToolComponent } from './client-info-tool.component';

@NgModule({
  imports: [],
  declarations: [ClientInfoToolComponent],
  exports: [ ClientInfoToolComponent],
  entryComponents: [ClientInfoToolComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FadqClientInfoToolModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientInfoToolModule,
      providers: []
    };
  }
}
