import {
  Injectable
} from '@angular/core';

import { DynamicComponentService } from 'src/lib/common';

import { WidgetComponent } from './component';
import { Widget } from './widget.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  constructor(private dynamicComponentService: DynamicComponentService) {}

  create(widgetCls: any): Widget {
    return this.dynamicComponentService.create(widgetCls as typeof WidgetComponent);
  }
}
