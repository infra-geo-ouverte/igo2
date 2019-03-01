import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatTooltipModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoPanelModule, IgoFlexibleModule, IgoToolModule } from '@igo2/common';

import { SidenavComponent } from './sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    IgoLanguageModule,
    IgoPanelModule,
    IgoFlexibleModule,
    IgoToolModule
  ],
  exports: [SidenavComponent],
  declarations: [SidenavComponent]
})
export class FadqSidenavModule {}
