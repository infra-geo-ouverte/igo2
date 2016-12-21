import {Injectable, Optional} from "@angular/core";
import {Response, Headers, URLSearchParams} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {AuthHttp} from "angular2-jwt";
import {Logger} from "../../core";

@Injectable()
export abstract class AuthRestService {
  // TODO voir pour extends BaseRestService
  // TODO: voir si possible de ne pas passer les dependacy injection dans chaque service mais prendre celui de la class de base
  protected url: string;

  constructor(
    protected authHttp: AuthHttp,
    @Optional() private logger: Logger
    ) { }

  public get(params?: Object, headers?: Object): Observable<any> {
    let myHeader = new Headers(headers);

    if (myHeader.get("Content-type") === undefined) {
      myHeader.append("Content-Type", "application/json");
    }

    return this.authHttp.get(this.url, {
      headers: myHeader,
      search: this.objToParams(params)
    }).map(res => {
      if (res.status === 204) {
        return "";
      } else {
        return res.json();
      }
    }).do(this.handleEyeball)
      .catch(this.handleError);
  }

  public getById(id: string): any {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    return this.authHttp.get(`${this.url}/${id}`, {
      headers: myHeader
    }).map(res => res.json())
      .do(this.handleEyeball)
      .catch(this.handleError);
  }

  public post(body: Object): Observable<any> {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    return this.authHttp.post(this.url, JSON.stringify(body), { headers: myHeader })
      .map(res => res.json())
      .do(this.handleEyeball)
      .catch(this.handleError);
  }

  public put(id: string, body: Object): any {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    return this.authHttp.put(`${this.url}/${id}`, JSON.stringify(body), { headers: myHeader })
      .map(res => res.json())
      .do(this.handleEyeball)
      .catch(this.handleError);
  }

  public deleteById(id: string): Observable<any> {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    return this.authHttp.delete(`${this.url}/${id}`, {
      headers: myHeader,
    }).map(res => res.json())
      .do(this.handleEyeball)
      .catch(this.handleError);
  }

  protected handleError(err: Response) {
    if (this.logger) {
      this.logger.error(err);
    }
    let message = [{ message: err.statusText || "Erreur serveur" }];
    let body: any = (<any> err)['_body'];
    if (typeof err.json === 'function' && body !== "" && err.json().message) {
      message = err.json().message;
    }
    return Observable.throw(message);
  }

  protected handleEyeball(data: any) {
    // TODO: mode debug
    /*if (this.logger) {
      this.logger.error(data);
    }*/
  }

  protected objToParams(obj: any): URLSearchParams {
    if (!obj) { return undefined; }
    let params = new URLSearchParams();
    params.paramsMap = this.objToMap(obj);
    return params;
  }

  private objToMap(obj: any): Map<any, any> {
    let strMap = new Map();
    for (let k of Object.keys(obj)) {
      strMap.set(k, [obj[k]]);
    }
    return strMap;
  }

  private serialize(obj: any, prefix?: string) {
    let str: any[] = [];
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        let k: any = prefix ? prefix + "[" + p + "]" : p;
        let v: any = obj[p];
        str.push(typeof v === "object" ?
          this.serialize(v, k) :
          encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  }
}
