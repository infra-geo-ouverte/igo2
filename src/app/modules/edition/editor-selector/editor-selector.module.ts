import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSelectModule } from '@angular/material';

import { EditorSelectorComponent } from './editor-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatSelectModule
  ],
  exports: [
    EditorSelectorComponent
  ],
  declarations: [
    EditorSelectorComponent
  ]
})
export class FadqEditorSelectorModule {}
