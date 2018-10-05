import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatRadioModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { SearchSelectorComponent } from './search-selector.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,

    IgoLanguageModule
  ],
  exports: [SearchSelectorComponent],
  declarations: [SearchSelectorComponent]
})
export class FadqSearchSelectorModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqSearchSelectorModule
    };
  }
}
