import { NgModule } from '@angular/core';
import {Http, RequestOptions, Response, Headers, URLSearchParams} from "@angular/http";

import { CoreModule}   from '../../core/index';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule }            from './auth-routing.module';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { ProtectedDirective } from './protected.directive';

import {provideAuth, AuthHttp, AuthConfig} from 'angular2-jwt/angular2-jwt';

export function authFactory(
   http: Http,
   options: RequestOptions) {
   return new AuthHttp(new AuthConfig({
     headerName: "Authorization",
     headerPrefix: "",
     tokenName: "id_token_igo",
     tokenGetter: (() => localStorage.getItem("id_token_igo")),
     noJwtError: true
   }), http, options);
};

@NgModule({
    imports: [CoreModule, AuthRoutingModule],
    declarations: [AuthComponent, ProtectedDirective],
    providers: [
      AuthService,
      AuthGuard,
      {
        provide: AuthHttp,
        useFactory: authFactory,
        deps: [Http, RequestOptions]
      }
    ],
    exports: [AuthComponent]
})

export class AuthModule {}
