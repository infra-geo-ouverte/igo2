import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FadqLibClientSchemaElementCreateFormModule
} from './client-schema-element-create-form/client-schema-element-create-form.module';
import {
  FadqLibClientSchemaElementUpdateFormModule
} from './client-schema-element-update-form/client-schema-element-update-form.module';
import {
  FadqLibClientSchemaElementReincludeFormModule
} from './client-schema-element-reinclude-form/client-schema-element-reinclude-form.module';
import {
  FadqLibClientSchemaElementSliceFormModule
} from './client-schema-element-slice-form/client-schema-element-slice-form.module';
import {
  FadqLibClientSchemaElementSaverModule
} from './client-schema-element-saver/client-schema-element-saver.module';
import {
  FadqLibClientSchemaElementUndoModule
} from './client-schema-element-undo/client-schema-element-undo.module';
import {
  FadqLibClientSchemaElementImportDataModule
} from './client-schema-element-import-data/client-schema-element-import-data.module';

import {
  provideClientSchemaElementPointService,
  provideClientSchemaElementLineService,
  provideClientSchemaElementSurfaceService,
  provideClientSchemaElementService,
} from './shared/client-schema-element.providers';
import {
  provideClientSchemaElementCreateWidget,
  provideClientSchemaElementUpdateWidget,
  provideClientSchemaElementReincludeWidget,
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
    FadqLibClientSchemaElementReincludeFormModule,
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
        provideClientSchemaElementReincludeWidget(),
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
