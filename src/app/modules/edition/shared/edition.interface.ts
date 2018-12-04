import { EntityTableTemplate } from 'src/app/modules/entity';

export interface EditorConfig {
  id: string;
  title: string;
  tableTemplate?: EntityTableTemplate;
}
