import { environment as prodEnv } from './environment.github';

if (!prodEnv.igo.app.pwa) {
  prodEnv.igo.app.pwa = {};
}
prodEnv.igo.app.pwa.enabled = true;
prodEnv.igo.app.install.enabled = true;
prodEnv.igo.app.install.promote = true;
prodEnv.igo.app.install.manifestPath = undefined;

export const environment = prodEnv;
