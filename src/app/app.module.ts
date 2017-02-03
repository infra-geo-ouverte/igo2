import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NavigatorModule, NavigatorRoutingModule } from './pages';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    MaterialModule.forRoot(),

    CoreModule.forRoot(),
    SharedModule.forRoot(),

    NavigatorModule,
    NavigatorRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
