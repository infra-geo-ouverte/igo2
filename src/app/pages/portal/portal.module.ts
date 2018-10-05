import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatRadioModule,
  MatSidenavModule
} from '@angular/material';

import { IgoCoreModule } from '@igo2/core';
import {
  IgoPanelModule,
  IgoBackdropModule,
  IgoFlexibleModule
} from '@igo2/common';
import { IgoGeoModule } from '@igo2/geo';
import { IgoContextModule } from '@igo2/context';
import { IgoToolsModule } from '@igo2/tools';

import { FadqMapModule } from '../../modules/map/map.module';
import { FadqSearchModule } from '../../modules/search/search.module';
import { FadqToolModule } from '../../modules/tool/tool.module';
import { FadqExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { FadqInfoPanelModule } from './info-panel/info-panel.module';
import { FadqSidenavModule } from './sidenav/sidenav.module';

import { PortalComponent } from './portal.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatRadioModule,
    MatSidenavModule,
    IgoCoreModule,
    IgoPanelModule,
    IgoBackdropModule,
    IgoFlexibleModule,
    IgoGeoModule,
    IgoContextModule,
    IgoToolsModule,

    FadqExpansionPanelModule,
    FadqInfoPanelModule,
    FadqSidenavModule,
    FadqMapModule,
    FadqSearchModule,
    FadqToolModule
  ],
  exports: [PortalComponent],
  declarations: [PortalComponent]
})
export class PortalModule {}
