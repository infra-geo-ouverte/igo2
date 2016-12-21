// Feel free to extend this interface
// depending on your app specific config.
interface IApi {
  protocol: string;
  host: string;
  port: number;
  path: string;
}

export interface IEnvConfig {
  APP_BASE?: string;
  ENV?: string;
  API?: IApi;
}
