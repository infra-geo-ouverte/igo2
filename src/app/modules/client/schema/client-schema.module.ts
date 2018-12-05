import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientSchemaService,
  provideClientSchemaFileService,
  provideClientSchemaFormService
} from './shared/client-schema.providers';

import { FadqClientSchemaCreateFormModule } from './client-schema-create-form/client-schema-create-form.module';
import { FadqClientSchemaUpdateFormModule } from './client-schema-update-form/client-schema-update-form.module';
import { FadqClientSchemaDeleteFormModule } from './client-schema-delete-form/client-schema-delete-form.module';
import { FadqClientSchemaDuplicateFormModule } from './client-schema-duplicate-form/client-schema-duplicate-form.module';
import { FadqClientSchemaFileManagerModule } from './client-schema-file-manager/client-schema-file-manager.module';
import { FadqClientSchemaSelectorModule } from './client-schema-selector/client-schema-selector.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqClientSchemaCreateFormModule,
    FadqClientSchemaUpdateFormModule,
    FadqClientSchemaDeleteFormModule,
    FadqClientSchemaDuplicateFormModule,
    FadqClientSchemaFileManagerModule,
    FadqClientSchemaSelectorModule
  ],
  declarations: []
})
export class FadqClientSchemaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientSchemaModule,
      providers: [
        provideClientSchemaService(),
        provideClientSchemaFileService(),
        provideClientSchemaFormService()
      ]
    };
  }
}
