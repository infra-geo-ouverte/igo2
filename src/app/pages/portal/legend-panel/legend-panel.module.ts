import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IgoLanguageModule } from '@igo2/core';


import { LegendPanelComponent } from './legend-panel.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    IgoLanguageModule
  ],
  exports: [LegendPanelComponent],
  declarations: [LegendPanelComponent]
})
export class LegendPanelModule {}
