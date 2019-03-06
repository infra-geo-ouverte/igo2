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
  IgoPanelModule,
  IgoBackdropModule,
  IgoFlexibleModule,
  IgoToolModule,
  IgoEntityTableModule
} from '@igo2/common';

import {
  IgoFeatureModule,
  IgoImportExportModule,
  IgoMapModule,
  IgoQueryModule,
  IgoSearchModule
} from '@igo2/geo';
import { IgoContextManagerModule, IgoContextMapButtonModule } from '@igo2/context';

import { IgoIntegrationModule } from '@igo2/integration';

import { AppExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { AppToastPanelModule } from './toast-panel/toast-panel.module';
import { AppSidenavModule } from './sidenav/sidenav.module';

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
    IgoPanelModule,
    IgoToolModule,
    IgoBackdropModule,
    IgoFlexibleModule,
    IgoIntegrationModule,
    AppExpansionPanelModule,
    AppToastPanelModule,
    AppSidenavModule,
    IgoContextManagerModule,
    IgoContextMapButtonModule,
    IgoEntityTableModule
  ],
  exports: [PortalComponent],
  declarations: [PortalComponent]
})
export class PortalModule {}
