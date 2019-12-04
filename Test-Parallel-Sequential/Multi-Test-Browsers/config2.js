exports.config = {
//Connect to the external selenimum server and 
//test through browsers via selenium

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['./test-spec.js'],

  maxSessions: 1,  



//Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
      DEFAULT_TIMEOUT_INTERVAL: 380000,
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

multiCapabilities: [{
    'browserName': 'chrome',
     maxInstances: 1,
     specs: 'Element-test.spec.js'    

  }, {
    'browserName': 'chrome',
    shardTestFiles: true,
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