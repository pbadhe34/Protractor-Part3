exports.config = {	

	//seleniumAddress: 'http://localhost:4444/wd/hub',

	allScriptsTimeout: 30000,

    'directConnect':true,


	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: 30000,
		print: function() {}
	},

	capabilities: {
		browserName: 'chrome'
	},
	params: {
		baseUrl: 'http://moduscreate.com/about'
	},
	specs: [],

	suites: {
		repeatable: 'test/testSpec.js'
	},

	framework: 'jasmine',

	onPrepare: function() {
      var SpecReporter = require('jasmine-spec-reporter');
      // add jasmine spec reporter
      jasmine.getEnv().addReporter(new SpecReporter({
      	displayStacktrace: false
      }));
   }
};