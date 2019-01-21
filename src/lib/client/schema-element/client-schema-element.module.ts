import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FadqLibClientSchemaElementSaverModule
} from './schema-element-saver/client-schema-element-saver.module';
import {
  FadqLibClientSchemaElementSurfaceCreateFormModule
} from './schema-element-surface-create-form/client-schema-element-surface-create-form.module';
import {
  FadqLibClientSchemaElementSurfaceUpdateFormModule
} from './schema-element-surface-update-form/client-schema-element-surface-update-form.module';

import {
  provideClientSchemaElementPointService,
  provideClientSchemaElementLineService,
  provideClientSchemaElementSurfaceService,
  provideClientSchemaElementService
} from './shared/client-schema-element.providers';
import {
  provideClientSchemaElementSaverWidget,
  provideClientSchemaElementSurfaceCreateWidget,
  provideClientSchemaElementSurfaceUpdateWidget
} from './shared/client-schema-element.widgets';
import { ClientSchemaElementFormService } from './shared/client-schema-element-form.service';
import { ClientSchemaElementTableService } from './shared/client-schema-element-table.service';
import { ClientSchemaElementPointEditorService } from './shared/client-schema-element-point-editor.service';
import { ClientSchemaElementLineEditorService } from './shared/client-schema-element-line-editor.service';
import { ClientSchemaElementSurfaceEditorService } from './shared/client-schema-element-surface-editor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibClientSchemaElementSaverModule,
    FadqLibClientSchemaElementSurfaceCreateFormModule,
    FadqLibClientSchemaElementSurfaceUpdateFormModule
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
        provideClientSchemaElementSurfaceCreateWidget(),
        provideClientSchemaElementSurfaceUpdateWidget(),
        ClientSchemaElementFormService,
        ClientSchemaElementTableService,
        ClientSchemaElementPointEditorService,
        ClientSchemaElementLineEditorService,
        ClientSchemaElementSurfaceEditorService
      ]
    };
  }
}
