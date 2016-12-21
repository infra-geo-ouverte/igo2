import {Injectable, Optional} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {Http, Headers} from "@angular/http";
import {BaseRestService, Logger} from "../../core";

@Injectable()
export class AuthService extends BaseRestService {
  public redirectUrl: string;
  protected url: string = "api/auth/login";
  private tokenKey: string = "id_token_igo";
  private token: string;

  constructor(http: Http, @Optional() logger: Logger) {
    super(http, logger);
    this.token = localStorage.getItem(this.tokenKey);
  }

  login(username: string, password: string): any {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    let body = JSON.stringify({
      login: username,
      password: this.encodePassword(password)
    });

    return this.http.post(this.url, body, { headers: myHeader })
    .map((res: any) => {
      let data = res.json();
      this.token = data.token;
      localStorage.setItem(this.tokenKey, this.token);
    }).catch(err => this.handleError(err));
  }

  logout() {
    this.token = undefined;
    localStorage.removeItem(this.tokenKey);
    return Observable.of(true);
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    let jwtHelper = new JwtHelper();
    return token && !jwtHelper.isTokenExpired(token);
  }

  getToken(): string {
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken() {
    if (this.isAuthenticated()) {
      let token = localStorage.getItem(this.tokenKey);
      let jwtHelper = new JwtHelper();
      return jwtHelper.decodeToken(token);
    }
    return false;
  }

  private encodePassword(password: string) {
    /* tslint:disable */
    let Base64 = { _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function(e: any) { var t = ""; var n: any, r: any, i: any, s: any, o: any, u: any, a: any; var f = 0; e = Base64._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this._keyStr.charAt(s) + this._keyStr.charAt(o) + this._keyStr.charAt(u) + this._keyStr.charAt(a) } return t }, decode: function(e: any) { var t = ""; var n: any, r: any, i: any; var s: any, o: any, u: any, a: any; var f = 0; e = e.replace(/[^A-Za-z0-9+/=]/g, ""); while (f < e.length) { s = this._keyStr.indexOf(e.charAt(f++)); o = this._keyStr.indexOf(e.charAt(f++)); u = this._keyStr.indexOf(e.charAt(f++)); a = this._keyStr.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = Base64._utf8_decode(t); return t }, _utf8_encode: function(e: any) { e = e.replace(/rn/g, "n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function(e: any) { var t = ""; var n = 0; var r = 0; var c1 = 0; var c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); var c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
    /* tslint:enable */
    return Base64.encode(password);
  }

  get logged() {
    return this.isAuthenticated();
  }
}
