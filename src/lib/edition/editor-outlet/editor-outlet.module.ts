import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FadqLibWidgetOutletModule
} from 'src/lib/widget/widget-outlet/widget-outlet.module';

import { EditorOutletComponent } from './editor-outlet.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FadqLibWidgetOutletModule
  ],
  exports: [
    EditorOutletComponent
  ],
  declarations: [
    EditorOutletComponent
  ]
})
export class FadqLibEditorOutletModule {}
