import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { NavigatorPageModule } from './navigator-page/navigator-page.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    CoreModule,
    SharedModule.forRoot(),
    AppRoutingModule,
    NavigatorPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
