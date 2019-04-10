import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ConcessionSelectorComponent } from './cadastre-concession-selector.component';

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
    IgoLanguageModule
  ],
  declarations: [ConcessionSelectorComponent],
  exports: [ConcessionSelectorComponent]
})
export class FadqConcessionSelectorModule {}
