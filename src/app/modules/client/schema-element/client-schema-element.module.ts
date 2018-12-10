import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientSchemaElementSurfaceService,
  provideClientSchemaElementService
} from './shared/client-schema-element.providers';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
  ],
  declarations: []
})
export class FadqClientSchemaElementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientSchemaElementModule,
      providers: [
        provideClientSchemaElementSurfaceService(),
        provideClientSchemaElementService()
      ]
    };
  }
}
