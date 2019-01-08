import {
  ComponentFactory,
  ComponentRef,
  ViewContainerRef
} from '@angular/core';

import { Subscription } from 'rxjs';

export class DynamicComponent<C> {

  private componentRef: ComponentRef<C>;
  private subscriptions: Subscription[] = [];
  private target: ViewContainerRef;
  private inputs: {[key: string]: any} = {};
  private subscribers: {[key: string]: (event: any) => void} = {};

  constructor(private componentFactory: ComponentFactory<C>) {}

  setTarget(target: ViewContainerRef) {
    this.target = target;
    this.componentRef = target.createComponent(this.componentFactory);
    this.updateInputs(this.inputs);
    this.updateSubscribers(this.subscribers);
  }

  destroy() {
    if (this.componentRef !== undefined) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
    if (this.target !== undefined) {
      this.target.clear();
    }
    this.unsubscribeAll();
  }

  updateInputs(inputs: {[key: string]: any}) {
    this.inputs = inputs;
    if (this.componentRef === undefined) {
      return;
    }

    const instance = this.componentRef.instance;
    const allowedInputs = this.componentFactory.inputs.map(input => input.propName);
    allowedInputs.forEach((key: string) => {
      if (inputs.hasOwnProperty(key)) {
        instance[key] = inputs[key];
      }
    });
  }

  updateSubscribers(subscribers: {[key: string]: (event: any) => void}) {
    this.subscribers = subscribers;
    if (this.componentRef === undefined) {
      return;
    }

    const instance = this.componentRef.instance;
    const allowedSubscribers = this.componentFactory.outputs.map(output => output.propName);
    allowedSubscribers.forEach((key: string) => {
      if (subscribers.hasOwnProperty(key)) {
        const emitter = instance[key];
        const subscriber = subscribers[key];
        if (Array.isArray(subscriber)) {
          subscriber.forEach((_subscriber) => {
            this.subscriptions.push(emitter.subscribe(_subscriber));
          });
        } else {
          this.subscriptions.push(emitter.subscribe(subscriber));
        }
      }
    });
  }

  private unsubscribeAll() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
    this.subscriptions = [];
  }
}
