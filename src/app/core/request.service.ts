import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RequestService {

  private count = 0;
  requests = new Subject<number>();

  constructor() { }

  register(request: Observable<any>) {
    this.count += 1;
    this.requests.next(this.count);

    return request.finally(this.unregister.call(this));
  }

  private unregister() {
    this.count -= 1;
    this.requests.next(this.count);
  }

}
