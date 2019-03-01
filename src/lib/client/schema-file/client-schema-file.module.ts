import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  provideClientSchemaFileService
} from './shared/client-schema-file.providers';

import { FadqLibClientSchemaFileManagerModule } from './client-schema-file-manager/client-schema-file-manager.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibClientSchemaFileManagerModule
  ],
  declarations: []
})
export class FadqLibClientSchemaFileModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqLibClientSchemaFileModule,
      providers: [
        provideClientSchemaFileService()
      ]
    };
  }
}
