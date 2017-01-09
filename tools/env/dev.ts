import { IEnvConfig } from './env-config.interface';

const DevConfig: IEnvConfig = {
  ENV: 'DEV',
  APP_BASE: "/igo2-dev/",
  API: {
    protocol: "http:",
    host: "127.0.0.1",
    port: 80,
    path: "/igo2/api/"
  }
};

export = DevConfig;
