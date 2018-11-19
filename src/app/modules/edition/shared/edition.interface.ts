import { EntityTableModel } from '../../entity/shared/entity.interface';

export interface EditorConfig {
  id: string;
  title: string;
  tableModel?: EntityTableModel;
}
