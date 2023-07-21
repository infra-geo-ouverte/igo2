import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';

import { IgoLanguageModule } from '@igo2/core';
import { IgoBackdropModule } from '@igo2/common';

import { ExpansionPanelComponent } from './expansion-panel.component';
import { ExpansionPanelHeaderComponent } from './expansion-panel-header.component';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
    IgoLanguageModule,
    IgoBackdropModule
  ],
  exports: [ExpansionPanelComponent],
  declarations: [ExpansionPanelComponent, ExpansionPanelHeaderComponent]
})
export class AppExpansionPanelModule {}
