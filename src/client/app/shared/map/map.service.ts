import {Injectable} from "@angular/core";
import {Headers, Response} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import { Observable } from 'rxjs/Observable';

import {Logger} from "../../core";
import {AuthRestService} from "../auth/index";

import { FormatInputIgo } from "./formatInputIgo";

@Injectable()
export class MapService extends AuthRestService {
  protected url: string = "app/shared/map/";
  constructor(
    authHttp: AuthHttp,
    logger: Logger
  ) {
    super(authHttp, logger);
  }

  public getView(id: string = ""): Observable<ol.View> {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    return <Observable<ol.View>>this.authHttp.get(`${this.url}view/view${id}.mock.json`, {
      headers: myHeader
    }).map((res: Response) => new FormatInputIgo().readView(res.json().view))
      .do(this.handleEyeball)
      .catch(this.handleError);
  }

  public getLayers(id: string = ""): Observable<ol.layer.Base[]> {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    return <Observable<ol.layer.Base[]>>this.authHttp.get(`${this.url}layers/layers${id}.mock.json`, {
      headers: myHeader
    }).map((res: Response) => new FormatInputIgo().readLayers(res.json().layers))
      .do(this.handleEyeball)
      .catch(this.handleError);
  }

}
