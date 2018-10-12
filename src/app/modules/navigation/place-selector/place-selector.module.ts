import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoGeoModule } from '@igo2/geo';

import { PlaceSelectorComponent } from './place-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatAutocompleteModule,

    IgoLanguageModule,
    IgoGeoModule
  ],
  exports: [
    PlaceSelectorComponent
  ],
  declarations: [
    PlaceSelectorComponent
  ]
})
export class FadqPlaceSelectorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqPlaceSelectorModule
    };
  }
}
