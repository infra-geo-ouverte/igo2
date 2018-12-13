import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FadqLibDynamicOutletModule
} from 'src/lib/common/dynamic-outlet/dynamic-outlet.module';

import { EditorOutletComponent } from './editor-outlet.component';

@NgModule({
  imports: [
    CommonModule,
    FadqLibDynamicOutletModule
  ],
  exports: [
    EditorOutletComponent
  ],
  declarations: [
    EditorOutletComponent
  ]
})
export class FadqLibEditorOutletModule {}
