import { environment as prodEnv } from './environment.github';


if (!prodEnv.igo.app.pwa) {
    prodEnv.igo.app.pwa = {};
}
prodEnv.igo.app.pwa.enabled = true;
prodEnv.igo.app.pwa.promote = true;
export const environment = prodEnv;
