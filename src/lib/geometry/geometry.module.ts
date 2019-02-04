import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FadqLibGeometryFormFieldModule } from './geometry-form-field/geometry-form-field.module';
import { GeometryFormFieldComponent } from './geometry-form-field/geometry-form-field.component';

@NgModule({
  imports: [
    CommonModule,
    FadqLibGeometryFormFieldModule
  ],
  exports: [
    FadqLibGeometryFormFieldModule
  ],
  declarations: [],
  providers: [],
  entryComponents: [
    GeometryFormFieldComponent
  ]
})
export class FadqLibGeometryModule {}
