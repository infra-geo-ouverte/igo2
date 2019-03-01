import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IgoWidgetOutletModule } from '@igo2/common';

import { EditorOutletComponent } from './editor-outlet.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    IgoWidgetOutletModule
  ],
  exports: [
    EditorOutletComponent
  ],
  declarations: [
    EditorOutletComponent
  ]
})
export class FadqLibEditorOutletModule {}
