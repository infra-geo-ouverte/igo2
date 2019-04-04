import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatTooltipModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule
} from '@angular/material';

import { IgoCoreModule } from '@igo2/core';
import {
  IgoActionModule,
  IgoEditionModule,
  IgoEntityModule,
  IgoPanelModule,
  IgoBackdropModule,
  IgoToolModule
} from '@igo2/common';

import {
  IgoGeoEditionModule,
  IgoFeatureModule,
  IgoImportExportModule,
  IgoMapModule,
  IgoQueryModule,
  IgoSearchModule
} from '@igo2/geo';
import { IgoContextManagerModule } from '@igo2/context';

import { IgoIntegrationModule } from '@igo2/integration';

import { IgoExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { IgoToastPanelModule } from './toast-panel/toast-panel.module';
import { IgoSidenavModule } from './sidenav/sidenav.module';

import { PortalComponent } from './portal.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    IgoCoreModule,
    IgoFeatureModule,
    IgoImportExportModule,
    IgoMapModule,
    IgoQueryModule.forRoot(),
    IgoSearchModule.forRoot(),
    IgoActionModule,
    IgoEditionModule,
    IgoEntityModule,
    IgoGeoEditionModule,
    IgoPanelModule,
    IgoToolModule,
    IgoBackdropModule,
    IgoExpansionPanelModule,
    IgoToastPanelModule,
    IgoIntegrationModule,
    IgoSidenavModule,
    IgoContextManagerModule
  ],
  exports: [PortalComponent],
  declarations: [PortalComponent]
})
export class PortalModule {}
