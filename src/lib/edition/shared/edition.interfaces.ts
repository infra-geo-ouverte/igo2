import { Action } from 'src/lib/action';
import { EntityStore, Entity, EntityTableTemplate } from 'src/lib/entity';

export interface EditorConfig {
  id: string;
  title: string;
  tableTemplate?: EntityTableTemplate;
  entityStore?: EntityStore<Entity>;
  actionStore?: EntityStore<Action>;
}
