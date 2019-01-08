import {
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

import { DynamicComponent } from '../shared/dynamic-component';
import { DynamicComponentService } from '../shared/dynamic-component.service';

@Component({
  selector: 'fadq-dynamic-outlet',
  templateUrl: 'dynamic-outlet.component.html',
  styleUrls: ['dynamic-outlet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicOutletComponent implements OnChanges, OnDestroy {

  @Input()
  get component(): DynamicComponent<any> { return this._component; }
  set component(value: DynamicComponent<any>) {
    // The setter accepts any class but TypeScript won't allow it.
    // See https://github.com/Microsoft/TypeScript/issues/2521
    if (value instanceof DynamicComponent) {
      this._component = value;
    } else {
      this._component = this.dynamicComponentService.create(value);
    }
  }
  private _component: DynamicComponent<any>;

  @Input()
  get inputs(): {[key: string]: any} { return this._inputs; }
  set inputs(value: {[key: string]: any}) { this._inputs = value; }
  private _inputs: {[key: string]: any};

  @Input()
  get subscribers(): {[key: string]: (event: any) => void} { return this._subscribers; }
  set subscribers(value: {[key: string]: (event: any) => void}) { this._subscribers = value; }
  private _subscribers: {[key: string]: (event: any) => void};

  @ViewChild('target', { read: ViewContainerRef })
  private target: ViewContainerRef;

  constructor(
    private dynamicComponentService: DynamicComponentService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const component = changes.component;
    const inputs = changes.inputs;
    const subscribers = changes.subscribers;

    if (component && component.currentValue !== component.previousValue) {
      this.createComponent();
    } else {
      if (inputs && inputs.currentValue !== inputs.previousValue) {
        this.updateInputs();
      }

      if (subscribers && subscribers.currentValue !== subscribers.previousValue) {
        this.updateSubscribers();
      }
    }
    this.cdRef.detectChanges();
  }

  ngOnDestroy() {
    this.component.destroy();
  }

  private createComponent() {
    this.component.setTarget(this.target);
    this.updateInputs();
    this.updateSubscribers();
  }

  private updateInputs() {
    this.component.updateInputs(this.inputs);
  }

  private updateSubscribers() {
    this.component.updateSubscribers(this.subscribers);
  }
}
