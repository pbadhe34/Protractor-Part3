var employees = require('./Data.module.js');
var using = require('jasmine-data-provider');

describe('find Modus twitter accounts', function() {

	beforeEach(function() {
		browser.ignoreSynchronization = true;
		browser.get(browser.params.baseUrl);
	});

	using(employees.twitterInfo, function(data, description) {

		it("Find the Twitter account for " + description, function() {
			expect(element(by.cssContainingText('.name', description)).isPresent()).toBeTruthy(
				'Employee not found'
				);
			expect(element(by.css('a[href="http://www.twitter.com/' + data.handle + '"]')).isPresent()).toBeTruthy(
				'Employee does not have twitter linked'
				);
			element(by.css('a[href="http://www.twitter.com/' + data.handle + '"]')).click();
			expect(browser.getTitle()).toEqual(description + " (@" + data.handle + ") | Twitter"); 
		})
	});

	afterEach(function() {
		browser.ignoreSynchronization = false;
	})
})