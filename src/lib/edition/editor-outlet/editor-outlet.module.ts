import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FadqLibDynamicContainerModule
} from 'src/lib/common/dynamic-container/dynamic-container.module';

import { EditorOutletComponent } from './editor-outlet.component';

@NgModule({
  imports: [
    CommonModule,
    FadqLibDynamicContainerModule
  ],
  exports: [
    EditorOutletComponent
  ],
  declarations: [
    EditorOutletComponent
  ]
})
export class FadqLibEditorOutletModule {}
