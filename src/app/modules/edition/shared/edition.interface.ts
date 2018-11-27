import { EntityTableModel } from 'src/app/modules/entity';

export interface EditorConfig {
  id: string;
  title: string;
  tableModel?: EntityTableModel;
}
