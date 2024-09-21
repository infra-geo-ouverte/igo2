import { IgoAppSearchModule } from '@igo2/integration';
import { IgoAppSearchResultsToolModule } from './search-results-tool/search-results-tool.module';
import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion'; // mobile
import { IgoLanguageModule } from '@igo2/core';
import { IgoMessageModule } from '@igo2/core';
import { AppFeatureInfoModule} from './feature-info/feature-info.module';
import { IgoFeatureModule } from './feature/feature.module';
import { IgoFeatureDetailsModule } from './feature/feature-details/feature-details.module';

import {
  IgoPanelModule,
  IgoFlexibleModule,
  IgoToolModule,
  IgoActionbarModule,
  IgoContextMenuModule
} from '@igo2/common';
import {
  IgoMapModule,
  IgoSearchModule,
  IgoLayerModule,
  IgoSearchResultsModule
} from '@igo2/geo';
import { IgoContextManagerModule } from '@igo2/context';
import { SidenavComponent } from './sidenav.component';
import { LegendPanelModule } from '../legend-panel/legend-panel.module';
import { LegendPanelButtonModule } from '../legend-panel-button/legend-panel-button.module';

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
