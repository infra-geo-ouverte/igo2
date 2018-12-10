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
export class FadqLibClientSchemaElementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibClientSchemaElementModule,
      providers: [
        provideClientSchemaElementSurfaceService(),
        provideClientSchemaElementService()
      ]
    };
  }
}
