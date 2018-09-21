import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatExpansionModule,
  MatMenuModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { BottomPanelComponent } from './bottom-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    IgoLanguageModule
  ],
  exports: [BottomPanelComponent],
  declarations: [BottomPanelComponent]
})
export class FadqBottomPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqBottomPanelModule
    };
  }
}
