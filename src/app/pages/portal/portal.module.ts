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
  IgoWorkspaceModule,
  IgoEntityModule,
  IgoPanelModule,
  IgoBackdropModule,
  IgoFlexibleModule,
  IgoContextMenuModule,
  IgoToolModule,
  IgoEntityTableModule
} from '@igo2/common';

import {
  IgoGeoWorkspaceModule,
  IgoFeatureModule,
  IgoImportExportModule,
  IgoMapModule,
  IgoQueryModule,
  IgoSearchModule
} from '@igo2/geo';
import {
  IgoContextManagerModule,
  IgoContextMapButtonModule
} from '@igo2/context';

import { IgoIntegrationModule } from '@igo2/integration';

import { MapOverlayModule } from './map-overlay/map-overlay.module';
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
    IgoActionModule,
    IgoWorkspaceModule,
    IgoEntityModule,
    IgoGeoWorkspaceModule,
    IgoPanelModule,
    IgoToolModule,
    IgoContextMenuModule,
    IgoBackdropModule,
    IgoFlexibleModule,
    IgoIntegrationModule,
    AppExpansionPanelModule,
    AppToastPanelModule,
    AppSidenavModule,
    MapOverlayModule,
    IgoContextManagerModule,
    IgoContextMapButtonModule,
    IgoEntityTableModule
  ],
  exports: [PortalComponent],
  declarations: [PortalComponent]
})
export class PortalModule {}
