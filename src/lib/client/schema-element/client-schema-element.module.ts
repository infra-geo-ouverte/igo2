import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientSchemaElementSurfaceService,
  provideClientSchemaElementService
} from './shared/client-schema-element.providers';
import { ClientSchemaElementTableService } from './shared/client-schema-element-table.service';
import { ClientSchemaElementWidgetService } from './shared/client-schema-element-widget.service';
import { ClientSchemaElementSurfaceEditorService } from './shared/client-schema-element-surface-editor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: []
})
export class FadqLibClientSchemaElementModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibClientSchemaElementModule,
      providers: [
        ClientSchemaElementTableService,
        ClientSchemaElementWidgetService,
        provideClientSchemaElementSurfaceService(),
        provideClientSchemaElementService(),
        ClientSchemaElementSurfaceEditorService
      ]
    };
  }
}
