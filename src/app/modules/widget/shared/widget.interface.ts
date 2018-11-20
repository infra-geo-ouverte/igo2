import { Entity } from '../../entity/shared/entity.interface';

export interface Widget extends Entity {
  id: string;
  title?: string;
  icon?: string;
  iconImage?: string;
  tooltip?: string;
  options?: { [key: string]: any };
}
