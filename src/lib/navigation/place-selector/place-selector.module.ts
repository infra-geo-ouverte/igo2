import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';

import { IgoStopPropagationModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';
import { IgoGeoModule } from '@igo2/geo';

import { PlaceSelectorComponent } from './place-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    IgoStopPropagationModule,
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
export class FadqLibPlaceSelectorModule {}
