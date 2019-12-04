/**
 * Very basic protractor configuration
 *
 */

exports.config = {
    specs: [
        'test1/*.js',
        'test2/*.js'
    ],
    capabilities: {
        browserName: 'chrome'
    },
    baseUrl: 'http://localhost:8090/PageObjects-App/',
    rootElement: 'body',
    framework: 'jasmine'
};
