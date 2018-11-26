import { Component } from '@angular/core';

import { EntityObject } from '../../entity/shared/entity.interface';
import { WidgetClass } from './widget';

export interface Widget extends EntityObject {
  id: string;
  title?: string;
  icon?: string;
  iconImage?: string;
  tooltip?: string;
  options?: { [key: string]: any };

  cls?: WidgetClass;
  component?: any;
  subscribers?: { [key: string]: (event: any) => void };
}
