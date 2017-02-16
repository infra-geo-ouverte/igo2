export abstract class ToolComponent {

  static name_: string;
  static title: string;
  static icon: string;
  static defaultOptions: {[key: string]: any};

  options?: {[key: string]: any};
  name?: string;
}
