import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ComponentRef, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { NavigatorModule, NavigatorRoutingModule } from './pages';

import { ToolService } from './core/tool.service';

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
  providers: [
    ToolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
