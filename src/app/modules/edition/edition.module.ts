import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorService } from './shared/editor.service';
import { FadqEditorOutletModule } from './editor-outlet/editor-outlet.module';
import { FadqEditorSelectorModule } from './editor-selector/editor-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FadqEditorOutletModule,
    FadqEditorSelectorModule
  ],
  exports: [
    FadqEditorOutletModule,
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
