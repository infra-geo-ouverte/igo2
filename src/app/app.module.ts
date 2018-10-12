import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IgoSpinnerModule, IgoStopPropagationModule } from '@igo2/common';

import {
  FadqCoreModule,
  FadqMapModule,
  FadqNavigationModule,
  FadqSearchModule,
  FadqToolModule
} from './modules';
import { ProjectionService } from './modules/map/shared/projection.service';
import { FadqPortalModule } from './pages';
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
