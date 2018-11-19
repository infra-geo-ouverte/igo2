import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorService } from './shared/editor.service';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [],
  declarations: []
})
export class FadqEditionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqEditionModule,
      providers: [
        EditorService
      ]
    };
  }
}
