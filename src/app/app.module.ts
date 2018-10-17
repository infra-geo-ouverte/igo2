import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';

import { FadqCoreModule } from './modules/core/core.module';
import { FadqMapModule } from './modules/map/map.module';
import { FadqNavigationModule } from './modules/navigation/navigation.module';
import { FadqSearchModule } from './modules/search/search.module';
import { FadqToolModule } from './modules/tool/tool.module';
import { FadqPortalModule } from './pages/portal/portal.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    FadqCoreModule.forRoot(),
    FadqMapModule,
    FadqNavigationModule,
    FadqSearchModule,
    FadqToolModule,
    FadqPortalModule,
    IgoSpinnerModule,
    IgoStopPropagationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
