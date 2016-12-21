import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderModule, NavbarModule, SharedModule } from './shared';
import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';


@NgModule({
  imports: [BrowserModule, HttpModule, AppRoutingModule, HeaderModule, NavbarModule, AboutModule, HomeModule, SharedModule.forRoot()],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }
