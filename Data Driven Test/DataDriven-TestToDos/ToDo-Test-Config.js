exports.config = {
    capabilities: {        
        'browserName': 'chrome'
    },
    
    'directConnect':true,

    framework: 'jasmine',
    specs: ['./Specs/Todo-Test-Spec.js'],

    jasmineNodeOpts: {
        defaultTimeoutInterval: 999999
    },

    onPrepare: function () {
        browser.manage().window().maximize();
        browser.manage().timeouts().implicitlyWait(5000);
        browser.manage().timeouts().setScriptTimeout(60000);
    }
};