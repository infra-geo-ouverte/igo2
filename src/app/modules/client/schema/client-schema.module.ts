import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideClientSchemaService } from './shared/client-schema.providers';

import { FadqClientSchemaUpdateFormModule } from './client-schema-update-form/client-schema-update-form.module';
import { FadqClientSchemaSelectorModule } from './client-schema-selector/client-schema-selector.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqClientSchemaUpdateFormModule,
    FadqClientSchemaSelectorModule
  ],
  declarations: []
})
export class FadqClientSchemaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientSchemaModule,
      providers: [
        provideClientSchemaService()
      ]
    };
  }
}
