import { EntityObject } from '../../entity/shared/entity.interface';

export interface Widget extends EntityObject {
  id: string;
  title?: string;
  icon?: string;
  iconImage?: string;
  tooltip?: string;
  options?: { [key: string]: any };
}
