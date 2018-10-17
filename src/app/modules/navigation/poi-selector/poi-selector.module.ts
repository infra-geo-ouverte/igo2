import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule
} from '@angular/material';

import { IgoStopPropagationModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';
import { IgoGeoModule } from '@igo2/geo';

import { PoiSelectorComponent } from './poi-selector.component';
import { PoiSelectorBindingDirective } from './poi-selector-binding.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    IgoStopPropagationModule,
    IgoLanguageModule,
    IgoGeoModule
  ],
  exports: [
    PoiSelectorComponent,
    PoiSelectorBindingDirective
  ],
  declarations: [
    PoiSelectorComponent,
    PoiSelectorBindingDirective
  ]
})
export class FadqPoiSelectorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqPoiSelectorModule
    };
  }
}
