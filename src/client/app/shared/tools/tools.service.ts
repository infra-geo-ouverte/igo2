import {Injectable} from "@angular/core";
import {Headers, Response} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import { Observable } from 'rxjs/Observable';

import {Logger} from "../../core";
import {AuthRestService} from "../auth/index";

@Injectable()
export class ToolsService extends AuthRestService {
  protected url: string = "app/shared/tools/";
  constructor(
    authHttp: AuthHttp,
    logger: Logger
  ) {
    super(authHttp, logger);
  }

  public get(id: string = ""): Observable<{}> {
    let myHeader = new Headers();
    myHeader.append("Content-Type", "application/json");

    return this.authHttp.get(`${this.url}tools${id}.mock.json`, {
      headers: myHeader
    }).map((res: Response) => res.json().tools)
      .do(this.handleEyeball)
      .catch(this.handleError);
  }

}
