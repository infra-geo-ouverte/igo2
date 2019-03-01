import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatSidenavModule
} from '@angular/material';

import { IgoLanguageModule } from '@igo2/core';
import {
  IgoActionModule,
  IgoEntityModule,
  IgoPanelModule,
  IgoBackdropModule,
  IgoToolModule
} from '@igo2/common';
import {
  IgoFeatureModule,
  IgoImportExportModule,
  IgoQueryModule
} from '@igo2/geo';
import { IgoContextManagerModule } from '@igo2/context';

import { FadqEditionModule } from '../../modules/edition/edition.module';
import { FadqMapModule } from '../../modules/map/map.module';
import { FadqSearchModule } from '../../modules/search/search.module';

import { FadqExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { FadqToastPanelModule } from './toast-panel/toast-panel.module';
import { FadqSidenavModule } from './sidenav/sidenav.module';

import { PortalComponent } from './portal.component';

// TODO: Clean this up
@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,

    IgoLanguageModule,
    IgoActionModule,
    IgoEntityModule,
    IgoPanelModule,
    IgoToolModule,
    IgoBackdropModule,
    IgoFeatureModule,
    IgoImportExportModule,
    IgoQueryModule,
    IgoContextManagerModule,

    FadqEditionModule,
    FadqMapModule,
    FadqSearchModule,
    FadqExpansionPanelModule,
    FadqToastPanelModule,
    FadqSidenavModule
  ],
  exports: [PortalComponent],
  declarations: [PortalComponent]
})
export class FadqPortalModule {}
