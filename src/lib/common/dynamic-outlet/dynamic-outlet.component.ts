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

  /**
   * The dynamic component base class or the dynamic component itself
   */
  @Input()
  set component(value: DynamicComponent<any>) {
    // The setter accepts any class but TypeScript won't allow it.
    // See https://github.com/Microsoft/TypeScript/issues/2521
    if (value instanceof DynamicComponent) {
      this._component = value;
    } else {
      this._component = this.dynamicComponentService.create(value);
    }
  }
  get component(): DynamicComponent<any> { return this._component; }
  private _component: DynamicComponent<any>;

  /**
   * The dynamic component inputs
   */
  @Input() inputs: {[key: string]: any};

  /**
   * The subscribers to the dynamic component outputs
   */
  @Input() subscribers: {[key: string]: (event: any) => void};

  /**
   * The view element to render the component to
   * @ignore
   */
  @ViewChild('target', { read: ViewContainerRef })
  private target: ViewContainerRef;

  constructor(
    private dynamicComponentService: DynamicComponentService,
    private cdRef: ChangeDetectorRef
  ) {}

  /**
   * If the dynamic component changes, create it.
   * If the inputs or subscribers change, update the current component's
   * inputs or subscribers.
   * @internal
   */
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

  /**
   * Destroy the dynamic component and all it's subscribers
   * @internal
   */
  ngOnDestroy() {
    this.component.destroy();
  }

  /**
   * Create and render the dynamic component. Set it's inputs and subscribers
   * @internal
   */
  private createComponent() {
    this.component.setTarget(this.target);
    this.updateInputs();
    this.updateSubscribers();
  }

  /**
   * Update the dynamic component inputs. This is an update so any
   * key not defined won't be overwritten.
   * @internal
   */
  private updateInputs() {
    this.component.updateInputs(this.inputs);
  }

  /**
   * Update the dynamic component subscribers. This is an update so any
   * key not defined won't be overwritten.
   * @internal
   */
  private updateSubscribers() {
    this.component.updateSubscribers(this.subscribers);
  }
}
