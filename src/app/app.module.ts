import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IgoStopPropagationModule } from '@igo2/common';

import { FadqCoreModule } from './modules/core/core.module';
import { FadqCommonModule } from './modules/common/common.module';
import { FadqAddressModule } from './modules/address/address.module';
import { FadqClientModule } from './modules/client/client.module';
import { FadqCatalogModule } from './modules/catalog/catalog.module';
import { FadqEditionModule } from './modules/edition/edition.module';
import { FadqEntityModule } from './modules/entity/entity.module';
import { FadqFeatureModule } from './modules/feature/feature.module';
import { FadqLayerModule } from './modules/layer/layer.module';
import { FadqMapModule } from './modules/map/map.module';
import { FadqNavigationModule } from './modules/navigation/navigation.module';
import { FadqOverlayModule } from './modules/overlay/overlay.module';
import { FadqSearchModule } from './modules/search/search.module';

import { FadqPortalModule } from './pages/portal/portal.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    IgoStopPropagationModule,
    FadqCoreModule,
    FadqCommonModule,
    FadqAddressModule,
    FadqClientModule.forRoot(),
    FadqCatalogModule.forRoot(),
    FadqEditionModule.forRoot(),
    FadqEntityModule,
    FadqFeatureModule,
    FadqLayerModule,
    FadqMapModule.forRoot(),
    FadqNavigationModule,
    FadqOverlayModule,
    FadqSearchModule.forRoot(),
    FadqPortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
