// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

/*global jasmine */
const { SpecReporter } = require('jasmine-spec-reporter');

var config = {
  allScriptsTimeout: 11000,
  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],
  seleniumAddress: 'http://hub-cloud.browserstack.com/wd/hub',
  capabilities: {
    'browserstack.user': 'geomsp1',
    'browserstack.key': 'RV23ni47kiJo5JLqj5Lx',
    'browserstack.debug': true,
    'build': 'protractor-browserstack',
    'os': 'Windows',
    'os_version': '10',
    'browserName': 'IE',
    'browser_version': '11.0',
    'resolution': '1024x768'
  },
  //directConnect: true,
  // baseUrl: 'http://localhost:4200/',
  baseUrl: 'https://infra-geo-ouverte.github.io/igo2/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 60000,
    print: function() {}
  },
  useAllAngular2AppRoots: true,
  beforeLaunch: function() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
  },
  onPrepare() {
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

exports.config = config;
