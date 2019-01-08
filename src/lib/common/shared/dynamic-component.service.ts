import {
  ComponentFactoryResolver,
  Injectable
} from '@angular/core';

import { DynamicComponent } from './dynamic-component';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentService {

  constructor(private resolver: ComponentFactoryResolver) {}

  create(componentCls: any) {
    const factory = this.resolver.resolveComponentFactory(<any>componentCls);
    return new DynamicComponent<typeof componentCls>(factory);
  }
}
