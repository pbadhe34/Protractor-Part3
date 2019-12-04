exports.config = {

 // seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

 directConnect:true,

 /*
 specs: [
    'writeJSON-spec.js',
    'ReadJSON-spec.js'
  ],
  */

//Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
      DEFAULT_TIMEOUT_INTERVAL: 30000,       
      isVerbose: true,
      showColors: true,
      includeStackTrace: true
  }, 


  multiCapabilities: [{
    'browserName': 'chrome',      
     specs: 'writeJSON-spec.js'
    
  }, {
    'browserName': 'chrome',   
    specs: 'ReadJSON-spec.js'    
 
  }],


 maxSessions: 2

  

  //baseUrl: 'http://localhost:8080'
};

