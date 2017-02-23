import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { LoggingService } from './logging.service';

@Injectable()
export class RequestService {

  private count = 0;
  requests = new Subject<number>();

  constructor(private loggingService: LoggingService) { }

  register(request: Observable<any>) {
    this.count += 1;
    this.requests.next(this.count);

    return request
      .catch(this.loggingService.handleError)
      .finally(this.unregister.call(this));
  }

  private unregister() {
    this.count -= 1;
    this.requests.next(this.count);
  }

}
