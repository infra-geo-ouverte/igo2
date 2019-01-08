import { EntityObject } from 'src/lib/entity';

export interface Action extends EntityObject {
  id: string;
  title: string;
  icon: string;
  tooltip: string;
  handler: ActionHandler;
  conditions?: Array<() => boolean>;
}

export type ActionHandler = () => void;
