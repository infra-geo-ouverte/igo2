import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibClientSchemaCreateFormModule } from './client-schema-create-form/client-schema-create-form.module';
import { FadqLibClientSchemaUpdateFormModule } from './client-schema-update-form/client-schema-update-form.module';
import { FadqLibClientSchemaDeleteFormModule } from './client-schema-delete-form/client-schema-delete-form.module';
import { FadqLibClientSchemaDuplicateFormModule } from './client-schema-duplicate-form/client-schema-duplicate-form.module';
import { FadqLibClientSchemaSelectorModule } from './client-schema-selector/client-schema-selector.module';

import {
  provideClientSchemaService,
  provideClientSchemaFormService
} from './shared/client-schema.providers';
import {
  provideClientSchemaCreateWidget,
  provideClientSchemaUpdateWidget,
  provideClientSchemaDeleteWidget,
  provideClientSchemaDuplicateWidget,
  provideClientSchemaFileManagerWidget
} from './shared/client-schema.widgets';
import { ClientSchemaTableService } from './shared/client-schema-table.service';
import { ClientSchemaEditorService } from './shared/client-schema-editor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibClientSchemaCreateFormModule,
    FadqLibClientSchemaUpdateFormModule,
    FadqLibClientSchemaDeleteFormModule,
    FadqLibClientSchemaDuplicateFormModule,
    FadqLibClientSchemaSelectorModule
  ],
  declarations: []
})
export class FadqLibClientSchemaModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibClientSchemaModule,
      providers: [
        provideClientSchemaService(),
        provideClientSchemaFormService(),
        provideClientSchemaCreateWidget(),
        provideClientSchemaUpdateWidget(),
        provideClientSchemaDeleteWidget(),
        provideClientSchemaDuplicateWidget(),
        provideClientSchemaFileManagerWidget(),
        ClientSchemaTableService,
        ClientSchemaEditorService
      ]
    };
  }
}
