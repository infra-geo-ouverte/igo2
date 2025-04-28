/* eslint-disable unused-imports/no-unused-imports */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
  IgoActionbarModule,
  IgoContextMenuModule,
  IgoFlexibleModule,
  IgoPanelModule,
  IgoToolModule
} from '@igo2/common';
import { IgoContextManagerModule } from '@igo2/context';
// mobile
import { IgoLanguageModule } from '@igo2/core';
import { IgoMessageModule } from '@igo2/core';
import {
  IgoLayerModule,
  IgoMapModule,
  IgoSearchModule,
  IgoSearchResultsModule
} from '@igo2/geo';
import { IgoAppSearchModule } from '@igo2/integration';

import { LegendPanelButtonModule } from '../legend-panel-button/legend-panel-button.module';
import { LegendPanelModule } from '../legend-panel/legend-panel.module';
import { AppFeatureInfoModule } from './feature-info/feature-info.module';
import { IgoFeatureDetailsModule } from './feature/feature-details/feature-details.module';
import { IgoFeatureModule } from './feature/feature.module';
import { IgoAppSearchResultsToolModule } from './search-results-tool/search-results-tool.module';
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
    //SEARCH
    MatCardModule,
    IgoMessageModule,
    IgoMapModule,
    IgoSearchModule,
    IgoActionbarModule,
    IgoContextMenuModule,
    IgoAppSearchModule,
    IgoSearchModule.forRoot(),
    IgoAppSearchResultsToolModule,
    MatExpansionModule,
    AppFeatureInfoModule,
    IgoFeatureModule,
    IgoFeatureDetailsModule,
    IgoLayerModule,
    IgoSearchResultsModule,
    LegendPanelModule
  ],
  exports: [SidenavComponent],
  declarations: [SidenavComponent]
})
export class AppSidenavModule {}
