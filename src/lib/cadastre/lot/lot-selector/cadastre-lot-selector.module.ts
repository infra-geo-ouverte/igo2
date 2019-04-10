import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { LotSelectorComponent } from './cadastre-lot-selector.component';

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
  declarations: [LotSelectorComponent],
  exports: [LotSelectorComponent]
})
export class FadqLotSelectorModule {}
