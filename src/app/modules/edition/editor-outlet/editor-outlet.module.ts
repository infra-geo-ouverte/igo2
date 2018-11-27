import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FadqDynamicContainerModule
} from 'src/app/modules/common/dynamic-container/dynamic-container.module';

import { EditorOutletComponent } from './editor-outlet.component';

@NgModule({
  imports: [
    CommonModule,
    FadqDynamicContainerModule
  ],
  exports: [
    EditorOutletComponent
  ],
  declarations: [
    EditorOutletComponent
  ]
})
export class FadqEditorOutletModule {}
