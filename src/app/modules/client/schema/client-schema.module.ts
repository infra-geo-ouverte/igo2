import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { provideClientSchemaService } from './shared/client-schema.providers';

import { FadqClientSchemaCreateFormModule } from './client-schema-create-form/client-schema-create-form.module';
import { FadqClientSchemaUpdateFormModule } from './client-schema-update-form/client-schema-update-form.module';
import { FadqClientSchemaDeleteFormModule } from './client-schema-delete-form/client-schema-delete-form.module';
import { FadqClientSchemaSelectorModule } from './client-schema-selector/client-schema-selector.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqClientSchemaCreateFormModule,
    FadqClientSchemaUpdateFormModule,
    FadqClientSchemaDeleteFormModule,
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
