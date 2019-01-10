import {
  ComponentFactoryResolver,
  Injectable
} from '@angular/core';

import { DynamicComponent } from './dynamic-component';

/**
 * Service to creates DynamicComponent instances from base component classes
 */
@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Creates a DynamicComponent instance from a base component class
   * @param componentCls The component class
   * @returns DynamicComponent instance
   */
  create(componentCls: any): DynamicComponent<any> {
    const factory = this.resolver.resolveComponentFactory(<any>componentCls);
    return new DynamicComponent<typeof componentCls>(factory);
  }
}
