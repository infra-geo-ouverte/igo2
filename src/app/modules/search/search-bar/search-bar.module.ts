import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatRadioModule
} from '@angular/material';

import { IgoGeoModule } from '@igo2/geo';
import { IgoLanguageModule } from '@igo2/core';

import { FadqSearchSelectorModule } from '../search-selector/search-selector.module';
import { SearchBarComponent } from './search-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    IgoGeoModule,
    IgoLanguageModule,
    FadqSearchSelectorModule
  ],
  exports: [SearchBarComponent],
  declarations: [SearchBarComponent]
})
export class FadqSearchBarModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqSearchBarModule
    };
  }
}
