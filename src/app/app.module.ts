import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderModule } from './header/header.module';
import { NavigatorPageModule } from './navigator-page/navigator-page.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    SharedModule.forRoot(),
    AppRoutingModule,
    HeaderModule,
    NavigatorPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
