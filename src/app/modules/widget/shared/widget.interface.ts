export interface Widget {
  id: string;
  title?: string;
  icon?: string;
  iconImage?: string;
  tooltip?: string;
  options?: { [key: string]: any };
}
