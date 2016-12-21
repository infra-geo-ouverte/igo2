import { IEnvConfig } from './env-config.interface';

const DevConfig: IEnvConfig = {
  ENV: 'DEV',
  APP_BASE: "/igo2-dev/",
  API: {
    protocol: "http:",
    host: "spssogl97d.sso.msp.gouv.qc.ca",
    port: 80,
    path: "/gespa/api/"
  }
};

export = DevConfig;
