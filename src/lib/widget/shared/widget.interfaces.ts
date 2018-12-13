import { EntityObject } from 'src/lib/entity';

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
  conditions?: Array<(data: {[key: string]: any}) => boolean>;
  subscribers?: { [key: string]: (event: any) => void };
}
