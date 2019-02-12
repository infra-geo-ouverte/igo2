export interface Action {
  id: string;
  title: string;
  icon: string;
  tooltip: string;
  handler: ActionHandler;
  conditions?: Array<() => boolean>;
}

export type ActionHandler = () => void;
