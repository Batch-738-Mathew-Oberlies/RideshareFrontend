// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: [
    // './src/**/*.e2e-spec.ts'
    // './test/landingpage.spec.js',
    // './test/register.spec.js',
    // './test/usernav.spec.js',
    './test/tripcomponent.spec.js'
  ],
  capabilities: {
    browserName: 'chrome'
  },
  directConnect: true,
  // baseUrl: 'http://http://54.174.82.153:4200/',
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.json')
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  }
};
