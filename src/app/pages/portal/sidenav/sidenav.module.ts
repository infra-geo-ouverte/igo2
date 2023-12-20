import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  IgoFlexibleModule,
  IgoHomeButtonModule,
  IgoInteractiveTourModule,
  IgoPanelModule,
  IgoToolModule
} from '@igo2/common';
import { IgoContextManagerModule } from '@igo2/context';
import { IgoLanguageModule } from '@igo2/core';
import { IgoFeatureModule } from '@igo2/geo';

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
        IgoInteractiveTourModule,
        IgoHomeButtonModule,
        SidenavComponent
    ],
    exports: [SidenavComponent]
})
export class AppSidenavModule {}
