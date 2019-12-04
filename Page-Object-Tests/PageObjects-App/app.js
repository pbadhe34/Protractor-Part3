'use strict';

/**
 * Main module of the application.
 */
angular
    .module('protractorGuidelinesApp', [
        'ngAnimate',
        'ngAria',
        'ngCookies',
        'ngMessages',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',

        // all custom modules
        'pgGrandfatherOfAllKnowledge',
        'pgRepeatAfterMe'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/test1', {
                templateUrl: 'App1/page.html',
                controller: 'GrandfatherCtrl'
            })
            .when('/test2', {
                templateUrl: 'App2/page.html',
                controller: 'AfterMeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

