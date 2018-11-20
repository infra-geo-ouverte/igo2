import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorService } from './shared/editor.service';
import { FadqEditorSelectorModule } from './editor-selector/editor-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqEditorSelectorModule
  ],
  exports: [
    FadqEditorSelectorModule
  ],
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
