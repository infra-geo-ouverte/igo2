export interface Tool {
  name: string;
  title?: string;
  icon?: string;
  toolbar?: boolean;
  options?: {[key: string]: any};
}
