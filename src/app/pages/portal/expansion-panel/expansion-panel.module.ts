import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { IgoBackdropModule } from '@igo2/common';
import { IgoLanguageModule } from '@igo2/core';

import { ExpansionPanelHeaderComponent } from './expansion-panel-header.component';
import { ExpansionPanelComponent } from './expansion-panel.component';

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
