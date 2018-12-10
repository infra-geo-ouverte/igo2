import {
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ComponentFactoryResolver,
  EventEmitter,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'fadq-dynamic-container',
  templateUrl: 'dynamic-container.component.html',
  styleUrls: ['dynamic-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicContainerComponent implements OnChanges, OnDestroy {

  private componentRef: ComponentRef<Component>;
  private subscriptions: Subscription[] = [];

  @Input()
  get component(): any {
    return this._component;
  }
  set component(value: any) {
    this._component = value;
  }
  private _component: any;

  @Input()
  get data(): Object {
    return this._data;
  }
  set data(value: Object) {
    this._data = value;
  }
  private _data: Object;

  @Input()
  get subscribers(): Object {
    return this._subscribers;
  }
  set subscribers(value: Object) {
    this._subscribers = value;
  }
  private _subscribers: Object;

  @ViewChild('target', { read: ViewContainerRef })
  private target: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const component = changes.component;
    const data = changes.data;
    const subscribers = changes.subscribers;

    if (component && component.currentValue !== component.previousValue) {
      this.createComponent();
    } else {
      if (data && data.currentValue !== data.previousValue) {
        this.updateData();
      }

      if (subscribers && subscribers.currentValue !== subscribers.previousValue) {
        this.updateSubscribers();
      }
    }
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroyComponent();
  }

  private createComponent() {
    this.destroyComponent();

    const component = this.component;
    const factory = this.resolver.resolveComponentFactory(<any>component);
    this.componentRef = this.target.createComponent(factory);
    this.updateData();
    this.updateSubscribers();
  }

  private destroyComponent() {
    if (this.componentRef !== undefined) {
      this.componentRef.destroy();
    }
    this.target.clear();
    this.unsubscribeAll();
  }

  private updateData() {
    if (this.componentRef === undefined) {
      return;
    }

    const instance = this.componentRef.instance;
    Object.entries(this.data || {}).forEach(([key, value]) => {
      if (key in instance) {
        try {
          instance[key] = value;
        } catch (e) {
          if (e instanceof TypeError) {
            // This happens when trying to set a property that
            // only has a getter and no setter. We don't want that
            // to fail so we simply skip this property.
          } else {
            throw(e);
          }
        }
      }
    });
  }

  private updateSubscribers() {
    if (this.componentRef === undefined) {
      return;
    }

    const instance = this.componentRef.instance;
    Object.entries(this.subscribers || {}).forEach(([key, subscriber]) => {
      if (key in instance) {
        const emitter = instance[key];
        if (emitter instanceof EventEmitter) {
          const subscribers = Array.isArray(subscriber) ? subscriber : [subscriber];
          subscribers.forEach((_subscriber) => {
            this.subscriptions.push(emitter.subscribe(_subscriber));
          });
        }
      }
    });
  }

  private unsubscribeAll() {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
    this.subscriptions = [];
  }
}
