import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatTooltipModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import { IgoPanelModule, IgoFlexibleModule, IgoToolModule } from '@igo2/common';
import { IgoFeatureModule } from '@igo2/geo';
import { IgoContextManagerModule } from '@igo2/context';

import { ToolboxModule } from '../toolbox/toolbox.module';
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
    IgoContextManagerModule,
    IgoToolModule,
    IgoFeatureModule,
    ToolboxModule
  ],
  exports: [SidenavComponent],
  declarations: [SidenavComponent]
})
export class AppSidenavModule {}
