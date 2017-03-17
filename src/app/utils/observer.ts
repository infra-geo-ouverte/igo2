import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class Observer implements OnDestroy {
  subscriptions: Subscription[] = [];

  constructor() {};

  ngOnDestroy() {
    this.unsubscribe();
  }

  protected unsubscribe() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
    this.subscriptions = [];
  }
}
