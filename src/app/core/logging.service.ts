import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoggingService {

  constructor() { }

  handleError(res: Response) {
    let errorMessage: string = `${res.status} - ${res.statusText || ''}`;

    if (res.status > 200 && res.status <= 300) {
      const body = res.json() || '';
      const error = body.error || JSON.stringify(body);
      errorMessage += `${errorMessage} ${error || ''}`;
    }

    console.log(errorMessage);
    return Observable.throw(errorMessage);
  }

}
