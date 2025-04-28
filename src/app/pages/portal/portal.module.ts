import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  IgoActionModule,
  IgoBackdropModule,
  IgoContextMenuModule,
  IgoEntityModule,
  IgoEntityTableModule,
  IgoEntityTablePaginatorModule,
  IgoFlexibleModule,
  IgoInteractiveTourModule,
  IgoPanelModule,
  IgoToolModule,
  IgoWorkspaceModule
} from '@igo2/common';
import {
  IgoContextManagerModule,
  IgoContextMapButtonModule
} from '@igo2/context';
import { IgoCoreModule } from '@igo2/core';
import {
  IgoFeatureModule,
  IgoGeoWorkspaceModule,
  IgoImportExportModule,
  IgoMapModule,
  IgoQueryModule,
  IgoSearchModule
} from '@igo2/geo';
import { IgoIntegrationModule } from '@igo2/integration';

import { AppExpansionPanelModule } from './expansion-panel/expansion-panel.module';
import { LegendPanelButtonModule } from './legend-panel-button/legend-panel-button.module';
import { MapOverlayModule } from './map-overlay/map-overlay.module';
import { PortalComponent } from './portal.component';
import { AppSidenavModule } from './sidenav/sidenav.module';
import { AppToastPanelForExpansionModule } from './toast-panel-for-expansion/toast-panel-for-expansion.module';
import { AppToastPanelModule } from './toast-panel/toast-panel.module';
import { IgoWelcomeWindowModule } from './welcome-window/welcome-window.module';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
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
    AppToastPanelForExpansionModule,
    AppSidenavModule,
    MapOverlayModule,
    IgoContextManagerModule,
    IgoContextMapButtonModule,
    IgoEntityTableModule,
    IgoEntityTablePaginatorModule,
    IgoInteractiveTourModule,
    IgoWelcomeWindowModule,
    LegendPanelButtonModule
  ],
  exports: [PortalComponent],
  declarations: [PortalComponent]
})
export class PortalModule {}
