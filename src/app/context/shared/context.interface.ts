export interface Context {
  title: string;
  uri: string;
  scope?: 'public' | 'protected' | 'private';
  description?: string;
  icon?: string;
}
