import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FadqLibClientSchemaElementSaverModule
} from './schema-element-saver/client-schema-element-saver.module';
import {
  FadqLibClientSchemaElementCreateFormModule
} from './schema-element-create-form/client-schema-element-create-form.module';
import {
  FadqLibClientSchemaElementUpdateFormModule
} from './schema-element-update-form/client-schema-element-update-form.module';
import {
  FadqLibClientSchemaElementSliceFormModule
} from './schema-element-slice-form/client-schema-element-slice-form.module';

import {
  provideClientSchemaElementPointService,
  provideClientSchemaElementLineService,
  provideClientSchemaElementSurfaceService,
  provideClientSchemaElementService
} from './shared/client-schema-element.providers';
import {
  provideClientSchemaElementSaverWidget,
  provideClientSchemaElementCreateWidget,
  provideClientSchemaElementUpdateWidget,
  provideClientSchemaElementSliceWidget
} from './shared/client-schema-element.widgets';
import { ClientSchemaElementFormService } from './shared/client-schema-element-form.service';
import { ClientSchemaElementTableService } from './shared/client-schema-element-table.service';
import { ClientSchemaElementEditorService } from './shared/client-schema-element-editor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibClientSchemaElementSaverModule,
    FadqLibClientSchemaElementCreateFormModule,
    FadqLibClientSchemaElementUpdateFormModule,
    FadqLibClientSchemaElementSliceFormModule
  ],
  declarations: []
})
export class FadqLibClientSchemaElementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibClientSchemaElementModule,
      providers: [
        provideClientSchemaElementPointService(),
        provideClientSchemaElementLineService(),
        provideClientSchemaElementSurfaceService(),
        provideClientSchemaElementService(),
        provideClientSchemaElementSaverWidget(),
        provideClientSchemaElementCreateWidget(),
        provideClientSchemaElementUpdateWidget(),
        provideClientSchemaElementSliceWidget(),
        ClientSchemaElementFormService,
        ClientSchemaElementTableService,

        ClientSchemaElementEditorService
      ]
    };
  }
}
