import { Action } from 'src/lib/action';
import { EntityStore, EntityTableTemplate } from 'src/lib/entity';

export interface EditorConfig {
  id: string;
  title: string;
  tableTemplate?: EntityTableTemplate;
  entityStore?: EntityStore<object>;
  actionStore?: EntityStore<Action>;
}
