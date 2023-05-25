import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

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
  IgoEntityTableModule,
  IgoEntityTablePaginatorModule,
  IgoInteractiveTourModule
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
import { AppToastPanelForExpansionModule } from './toast-panel-for-expansion/toast-panel-for-expansion.module';

import { IgoWelcomeWindowModule } from './welcome-window/welcome-window.module';
import { IgoGIINModule } from './giin/giin.module';
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
        IgoGIINModule,
        IgoWelcomeWindowModule
    ],
    exports: [PortalComponent],
    declarations: [PortalComponent]
})
export class PortalModule {}
