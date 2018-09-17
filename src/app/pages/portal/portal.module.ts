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
  IgoFlexibleModule
} from '@igo2/common';
import { IgoGeoModule } from '@igo2/geo';
import { IgoContextModule } from '@igo2/context';
import { IgoToolsModule } from '@igo2/tools';

import { PortalComponent } from './portal.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    IgoCoreModule,
    IgoPanelModule,
    IgoBackdropModule,
    IgoFlexibleModule,
    IgoGeoModule,
    IgoContextModule,
    IgoToolsModule
  ],
  exports: [PortalComponent],
  declarations: [PortalComponent]
})
export class PortalModule {}
