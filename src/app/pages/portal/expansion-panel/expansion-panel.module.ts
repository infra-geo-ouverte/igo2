import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatTooltipModule,
  MatExpansionModule,
  MatMenuModule,
  MatTableModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';

import { ExpansionPanelComponent } from './expansion-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatTableModule,
    MatTooltipModule,
    IgoLanguageModule
  ],
  exports: [ExpansionPanelComponent],
  declarations: [ExpansionPanelComponent]
})
export class FadqExpansionPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqExpansionPanelModule
    };
  }
}
