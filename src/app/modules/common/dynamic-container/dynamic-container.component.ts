import {
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  ComponentFactoryResolver,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewContainerRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'fadq-dynamic-container',
  templateUrl: 'dynamic-container.component.html',
  styleUrls: ['dynamic-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicContainerComponent implements OnChanges, OnDestroy {

  private componentRef: ComponentRef<Component>;

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

  @ViewChild('target', { read: ViewContainerRef })
  private target: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    const component = changes.component;
    const data = changes.data;

    if (component && component.currentValue !== component.previousValue) {
      this.createComponent();
    } else if (data && data.currentValue !== data.previousValue) {
      this.updateData();
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
  }

  private destroyComponent() {
    if (this.componentRef !== undefined) {
      this.componentRef.destroy();
    }
    this.target.clear();
  }

  private updateData() {
    if (this.componentRef === undefined) {
      return;
    }

    const instance = this.componentRef.instance;
    Object.entries(this.data || {}).forEach(([key, value]) => {
      if (key in instance) {
        instance[key] = value;
      }
    });
  }
}
