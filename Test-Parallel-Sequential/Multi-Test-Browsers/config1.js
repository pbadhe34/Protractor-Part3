exports.config = {
//Connect to the external selenimum server and 
//test through browsers via selenium

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['./test-spec.js'],


//Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
      DEFAULT_TIMEOUT_INTERVAL: 10000,
      onComplete: null,
      isVerbose: true,
      showColors: true,
      includeStackTrace: true
  }, 
   
/*
multiCapabilities: [{
  'browserName': 'chrome'
}, {
  'browserName': 'internet explorer'
}],
*/

//To run in sequence limit the maxSessions: 1  

 //maxSessions: 1  default is unlimited


multiCapabilities: [{
    'browserName': 'chrome',
     maxInstances: 1,
     specs: 'Element-test.spec.js'     

  }, {
    'browserName': 'chrome',
    shardTestFiles: true,
 //seperate test spec file execution in each browser instance
    maxInstances: 2,
    specs: 'Angular-site-test-spec.js'
   
  },
 {
    shardTestFiles: true,
    'browserName': 'internet explorer',
    maxInstances: 1,         
 
    /**
     * Number of times to run this set of capabilities (in parallel, unless
     * limited by maxSessions). Default is 1.
     */
    count: 1,
    specs: 'Calci-test-spec.js'
  }

]


};