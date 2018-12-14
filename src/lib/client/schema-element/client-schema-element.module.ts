import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientSchemaElementSurfaceService,
  provideClientSchemaElementService
} from './shared/client-schema-element.providers';
import { ClientSchemaElementFormService } from './shared/client-schema-element-form.service';
import { ClientSchemaElementTableService } from './shared/client-schema-element-table.service';
import { ClientSchemaElementWidgetService } from './shared/client-schema-element-widget.service';
import { ClientSchemaElementSurfaceEditorService } from './shared/client-schema-element-surface-editor.service';

import {
  FadqLibClientSchemaElementSurfaceCreateFormModule
} from './schema-element-surface-create-form/client-schema-element-surface-create-form.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibClientSchemaElementSurfaceCreateFormModule
  ],
  declarations: []
})
export class FadqLibClientSchemaElementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibClientSchemaElementModule,
      providers: [
        provideClientSchemaElementSurfaceService(),
        provideClientSchemaElementService(),
        ClientSchemaElementFormService,
        ClientSchemaElementTableService,
        ClientSchemaElementWidgetService,
        ClientSchemaElementSurfaceEditorService
      ]
    };
  }
}
