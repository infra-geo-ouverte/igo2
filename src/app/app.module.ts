import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NavigatorModule, NavigatorRoutingModule } from './pages';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),

    CoreModule,
    SharedModule.forRoot(),

    NavigatorModule,
    NavigatorRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
