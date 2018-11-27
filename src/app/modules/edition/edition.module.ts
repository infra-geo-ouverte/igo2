import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
export class FadqEditionModule {}
