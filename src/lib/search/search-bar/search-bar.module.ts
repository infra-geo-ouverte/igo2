import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatRadioModule,
  MatFormFieldModule,
  MatInputModule
} from '@angular/material';

import { IgoGeoModule } from '@igo2/geo';
import { IgoLanguageModule } from '@igo2/core';

import { FadqLibSearchSelectorModule } from '../search-selector/search-selector.module';
import { SearchBarComponent } from './search-bar.component';

/**
 * @ignore
 */
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    IgoGeoModule,
    IgoLanguageModule,
    FadqLibSearchSelectorModule
  ],
  exports: [SearchBarComponent],
  declarations: [SearchBarComponent]
})
export class FadqLibSearchBarModule {}
