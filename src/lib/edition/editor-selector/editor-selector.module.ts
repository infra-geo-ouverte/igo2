import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatSelectModule } from '@angular/material';

import { EditorSelectorComponent } from './editor-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule
  ],
  exports: [
    EditorSelectorComponent
  ],
  declarations: [
    EditorSelectorComponent
  ]
})
export class FadqLibEditorSelectorModule {}
