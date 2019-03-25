import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  FadqLibClientSchemaElementSaverModule
} from './schema-element-saver/client-schema-element-saver.module';
import {
  FadqLibClientSchemaElementUndoModule
} from './schema-element-undo/client-schema-element-undo.module';
import {
  FadqLibClientSchemaElementImportDataModule
} from './schema-element-import-data/client-schema-element-import-data.module';

import {
  provideClientSchemaElementPointService,
  provideClientSchemaElementLineService,
  provideClientSchemaElementSurfaceService,
  provideClientSchemaElementService,
} from './shared/client-schema-element.providers';
import {
  provideClientSchemaElementCreateWidget,
  provideClientSchemaElementUpdateWidget,
  provideClientSchemaElementSliceWidget,
  provideClientSchemaElementSaverWidget,
  provideClientSchemaElementUndoWidget,
  provideClientSchemaElementImportDataWidget
} from './shared/client-schema-element.widgets';
import { ClientSchemaElementFormService } from './shared/client-schema-element-form.service';
import { ClientSchemaElementTableService } from './shared/client-schema-element-table.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibClientSchemaElementCreateFormModule,
    FadqLibClientSchemaElementUpdateFormModule,
    FadqLibClientSchemaElementSliceFormModule,
    FadqLibClientSchemaElementSaverModule,
    FadqLibClientSchemaElementUndoModule,
    FadqLibClientSchemaElementImportDataModule
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
        provideClientSchemaElementCreateWidget(),
        provideClientSchemaElementUpdateWidget(),
        provideClientSchemaElementSliceWidget(),
        provideClientSchemaElementSaverWidget(),
        provideClientSchemaElementUndoWidget(),
        provideClientSchemaElementImportDataWidget(),
        ClientSchemaElementFormService,
        ClientSchemaElementTableService
      ]
    };
  }
}
