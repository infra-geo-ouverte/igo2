import { EntityTableTemplate } from 'src/lib/entity';

export interface EditorConfig {
  id: string;
  title: string;
  tableTemplate?: EntityTableTemplate;
}
