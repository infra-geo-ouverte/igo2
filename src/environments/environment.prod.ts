import { IgoEnvironment, igoEnvironment } from './environment.partial';

interface Environment {
  production: boolean;
  configPath: string;
  igo: IgoEnvironment;
}

/* tslint:disable */
export const environment: Environment = {
  production: true,
  configPath: './config/config.json',
  igo: Object.assign({}, igoEnvironment, {
    context: {
      url: '/app/interne/igovisualisation/contexte_catalogue'
    },
    importExport: {
      url: 'http://plssisigpro1.fadq.qc:3000'
    }
  })
};
