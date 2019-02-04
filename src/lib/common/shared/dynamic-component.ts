import {
  ComponentFactory,
  ComponentRef,
  ViewContainerRef,
  SimpleChange
} from '@angular/core';

import { Subscription } from 'rxjs';

/**
 * This class is used in the DynamicComponentOutlet component. It holds
 * a reference to a component factory and can render that component
 * in a target element on demand. It's also possible to set inputs
 * and to subscribe to outputs.
 */
export class DynamicComponent<C> {

  /**
   * Component reference
   */
  private componentRef: ComponentRef<C>;

  /**
   * Subscriptions to the component's outputs. Those need
   * to be unsubscribed when the component is destroyed.
   */
  private subscriptions: Subscription[] = [];

  /**
   * Component target element
   */
  private target: ViewContainerRef;

  /**
   * Component inputs
   */
  private inputs: {[key: string]: any} = {};

  /**
   * Subscribers to the component's outputs
   */
  private subscribers: {[key: string]: (event: any) => void} = {};

  constructor(private componentFactory: ComponentFactory<C>) {}

  /**
   * Render the component to a target element.
   * Set it's inputs and subscribe to it's outputs.
   * @param target Target element
   */
  setTarget(target: ViewContainerRef) {
    this.target = target;
    this.componentRef = target.createComponent(this.componentFactory);
    this.updateInputs(this.inputs);
    this.updateSubscribers(this.subscribers);
  }

  /**
   * Destroy this component. That means, removing from it's target
   * element and unsubscribing to it's outputs.
   */
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

  /**
   * Update the component inputs. This is an update so any
   * key not defined won't be overwritten.
   */
  updateInputs(inputs: {[key: string]: any}) {
    this.inputs = inputs;
    if (this.componentRef === undefined) {
      return;
    }

    const instance = this.componentRef.instance;
    const allowedInputs = this.componentFactory.inputs;
    allowedInputs.forEach((value: {propName: string; templateName: string; }) => {
      const key = value.propName;
      if (inputs.hasOwnProperty(key)) {
        instance[key] = inputs[key];
      }
    });

    if (typeof (instance as any).onUpdateInputs === 'function') {
      (instance as any).onUpdateInputs();
    }
  }

  /**
   * Update the component subscribers. This is an update so any
   * key not defined won't be overwritten.
   */
  updateSubscribers(subscribers: {[key: string]: (event: any) => void}) {
    this.subscribers = subscribers;
    if (this.componentRef === undefined) {
      return;
    }

    const instance = this.componentRef.instance;
    const allowedSubscribers = this.componentFactory.outputs;
    allowedSubscribers.forEach((value: {propName: string; templateName: string; }) => {
      const key = value.propName;
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

  /**
   * Unsubscribe to all outputs.
   */
  private unsubscribeAll() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
    this.subscriptions = [];
  }

}
