import { join } from 'path';

import { SeedConfig } from './seed.config';
import { IExtendPackages } from './seed.config.interfaces';

// tslint:disable-next-line: no-var-requires
const proxy = require('proxy-middleware');

/**
 * This class extends the basic seed configuration, allowing for project specific overrides. A few examples can be found
 * below.
 */
export class ProjectConfig extends SeedConfig {

  PROJECT_TASKS_DIR: string = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');

  FONTS_DEST: string = `${this.APP_DEST}/fonts`;
  FONTS_SRC: string[] = [
      'node_modules/font-awesome/fonts/**',
      'node_modules/bootstrap/dist/fonts/**'
  ];

  ENABLE_SCSS: boolean = true;

  constructor() {
    super();
    this.APP_TITLE = 'IGO 2';

    /* Enable typeless compiler runs (faster) between typed compiler runs. */
    // this.TYPED_COMPILE_INTERVAL = 5;

    let api = this.PLUGIN_CONFIGS['environment-config-json']['API'];
    if (api) {
      this.PLUGIN_CONFIGS['browser-sync']['middleware'] = [
        proxy({
          protocol: api['protocol'],
          hostname: api['host'],
          port: api['port'] || 80,
          pathname: api['path'],
          route: `${this.APP_BASE}api`
        }),
        ...this.PLUGIN_CONFIGS['browser-sync']['middleware']
      ];
    }

    // Add `NPM` third-party libraries to be injected/bundled.
    this.NPM_DEPENDENCIES = [
      ...this.NPM_DEPENDENCIES,
      {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/js/bootstrap.min.js', inject: 'libs'},
      {src: 'bootstrap/dist/css/bootstrap.min.css', inject: true},
      {src: 'openlayers/dist/ol-debug.js', inject: 'libs'},
      {src: 'openlayers/dist/ol-debug.css', inject: true}
    ];

    // Add `local` third-party libraries to be injected/bundled.
    this.APP_ASSETS = [
      ...this.APP_ASSETS,
      // {src: `${this.APP_SRC}/your-path-to-lib/libs/jquery-ui.js`, inject: true, vendor: false}
      // {src: `${this.CSS_SRC}/path-to-lib/test-lib.css`, inject: true, vendor: false},
    ];

    // Add packages
    let additionalPackages: IExtendPackages[] = [{
       name: 'ng2-translate',
       path: 'node_modules/ng2-translate/bundles/ng2-translate.umd.js'
     }, {
       name: 'angular2-jwt',
       path: 'node_modules/angular2-jwt',
       packageMeta: {
            main: './angular2-jwt.js',
            defaultExtension: 'js'
       }
     }];

    this.addPackagesBundles(additionalPackages);

    /* Add to or override NPM module configurations: */
    // this.mergeObject(this.PLUGIN_CONFIGS['browser-sync'], { ghostMode: false });
  }

}
