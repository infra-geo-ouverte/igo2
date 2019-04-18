// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { IgoEnvironment, igoEnvironment } from './environment.partial';

interface Environment {
  production: boolean;
  configPath: string;
  igo: IgoEnvironment;
}

/* tslint:disable */
export const environment: Environment = {
  production: false,
  configPath: './config/local.json',
  igo: Object.assign({}, igoEnvironment, {
    context: {
      contextListFile: 'locals.json',
      defaultContextUri: 'local'
    },
    searchSources: {
      icherche: {
        searchUrl: '/icherche/geocode'
      }
    },
    importExport: {
      url: '/ogre'
    }
  })
};
