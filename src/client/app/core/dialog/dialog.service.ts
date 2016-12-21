import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";

/**
 * Async modal dialog service
 * DialogService makes this app easier to test by faking this service.
 * TODO: better modal implementation that doesn't use window.confirm
 */
@Injectable()
export class DialogService {
  /**
   * Ask user to confirm an action. `message` explains the action and choices.
   * Returns observable resolving to `true`=confirm or `false`=cancel
   */
  confirm(message?: string): Observable<boolean> {
    let promise = new Promise<boolean>(resolve => {
      return resolve(window.confirm(message || 'Is it OK?'));
    });
    return Observable.fromPromise(promise);
  };
}
