import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';
import { IgoQueryModule } from '@igo2/geo';
import { IgoIntegrationModule } from '@igo2/integration';

import { FadqCoreModule } from './modules/core/core.module';
import { FadqClientModule } from './modules/client/client.module';
import { FadqSearchModule } from './modules/search/search.module';

import { FadqPortalModule } from './pages/portal/portal.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    IgoSpinnerModule,
    IgoStopPropagationModule,
    IgoQueryModule.forRoot(),
    IgoIntegrationModule,
    FadqCoreModule,
    FadqClientModule.forRoot(),
    FadqSearchModule.forRoot(),
    FadqPortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
