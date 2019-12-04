exports.config = {
  allScriptsTimeout: 11000,

  specs: [
     'e2e/spec/*.spec.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  chromeOnly: true,

  baseUrl: 'http://localhost:8090/PageObject-Gallery/app/#/phones/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
