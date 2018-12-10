import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientSchemaFileService
} from './shared/client-schema-file.providers';

import { FadqClientSchemaFileManagerModule } from './client-schema-file-manager/client-schema-file-manager.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqClientSchemaFileManagerModule
  ],
  declarations: []
})
export class FadqClientSchemaFileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqClientSchemaFileModule,
      providers: [
        provideClientSchemaFileService()
      ]
    };
  }
}
