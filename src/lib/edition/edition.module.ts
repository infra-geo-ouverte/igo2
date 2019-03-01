import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibEditorOutletModule } from './editor-outlet/editor-outlet.module';
import { FadqLibEditorSelectorModule } from './editor-selector/editor-selector.module';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    FadqLibEditorOutletModule,
    FadqLibEditorSelectorModule
  ],
  declarations: []
})
export class FadqLibEditionModule {}
