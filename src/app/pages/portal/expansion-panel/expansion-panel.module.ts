import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatListModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoBackdropModule } from '@igo2/common';

import { ExpansionPanelComponent } from './expansion-panel.component';
import { ExpansionPanelHeaderComponent } from './expansion-panel-header.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatTableModule,
    IgoLanguageModule,
    IgoBackdropModule
  ],
  exports: [ExpansionPanelComponent],
  declarations: [
    ExpansionPanelComponent,
    ExpansionPanelHeaderComponent
  ]
})
export class FadqExpansionPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FadqExpansionPanelModule
    };
  }
}
