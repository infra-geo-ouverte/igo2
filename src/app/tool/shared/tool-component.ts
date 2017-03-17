import { Observer } from '../../utils/observer';

export class ToolComponent extends Observer {

  static name_: string;
  static title: string;
  static icon: string;
  static toolbar?: boolean;
  static defaultOptions: {[key: string]: any};

  options?: {[key: string]: any};
  name?: string;

  constructor() {
    super();
  }
}
