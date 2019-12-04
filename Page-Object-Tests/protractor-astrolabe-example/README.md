protractor-astrolabe-example
============================
(update 16/10/14 now including cucumber protractor tests)
#Explanation

This is a tiny example project showing end to end browser based testing for an angularjs project.

Protractor is a tool to do end to end browser based testing for angularjs projects.

We write a test in jasmine which uses protractor in the background to start a browser and run the tests.

Astrolabe is required to build a page object.
This allows us to break a html page up into components.
This allows the test to be less brittle when the styling of the page changes.
[Page object pattern explained](https://code.google.com/p/selenium/wiki/PageObjects)

This is a very simple example project showing the setup of the components.

###What the project tests
There is a simple js jasmine test (search.spec.js) validating:

1. we can open a html page at an expected url.
1. see there is an input box on a page.
1. input text upon that input box.
1. see the text we imputed in the expected input box.
1. test to see that we have a reapeated "Awsome Thing" on the page.  
1. Tests that there is expected text of a single "Awsome thing".  This "Awsome Thing" is represented on the page via a astrolabe module.  All parts that make up an "Awsome Thing" are handled via the module awsome-thing-module.js


#Projects used in this example
Not all are required for the running of this project they are shown to get more information about them.

##Testing

[Jasmine](http://jasmine.github.io/) test library that the tests are written in.

[Protractor](https://github.com/angular/protractor) End to end tests using selenium for angularjs projects.

[Protractor API](https://github.com/angular/protractor/blob/master/docs/api.md) more information about interacting with the page and its elements.

[Astrolabe](https://github.com/stuplum/astrolabe) Page object pattern style protractor test.

[Grunt-Protractor-runner](https://github.com/teerapap/grunt-protractor-runner) grunt runner for protractor.


##Running

[Grunt-cli](https://github.com/gruntjs/grunt-cli) run grunt build files from the command line.  My grunt file was generated by yeoman.

[Bower](https://github.com/bower/bower) package manager for the front end package management.

##Creating skeleton/base project
The following are not needed for running this example.

[Yeoman](http://yeoman.io) node project skeleton generator

[Angular-generator](https://github.com/yeoman/generator-angular) used to generate the angular project skeleton via yeoman.

[Angularjs](http://angularjs.org) example node project that we generate via yeoman.


#Assumed installs on command line
1. node and npm installed on the command line.
1. Java 6 or above on the command line as it is needed to run the selenium stand-alone.
1. npm global installs
	1. grunt-cli
	1. bower
1. Firefox installed

#How to run project
You will need to start 3 different terminal windows all started from the same project folder where the source was cloned to run this.

1. one window for the webdriver/selenium stand-alone process.
1. second window to have a running project serving up your webpages.
1. third window from you to run the protractor browser based tests

#Install project dependencies
Create a terminal window and navigate to the project source.

##Install protractor

###NPM install
	install -g protractor

###Get chromedriver if you want to use chrome for tests
	webdriver-manager update



#Setup environment, and run the tests

##1. Start selenium stand-alone on command line
	webdriver-manager start

###Purpose
The selenium stand-alone can take 10 seconds to start so you do not want that penalty every time you run your tests.

Best to have the stand-alone running, and then after you make changes to a test, then run the tests and if they fail, they fail really fast.

You can setup the grunt-protractor-runner to start up selenium each time your run your end to end tests but you then have to take the 10 second penalty.  I will not cover how to do this please see the grunt-protractor-runner documentation to see this.



###How we use the selenium stand-alone
The protractor.conf.js in test/config/protractor.conf.js has a string that becomes

	seleniumAddress: 'http://localhost::4444/wd/hub',

This is the default address for the selenium stand-alone that you just started above.


##2. Install project
Create the second terminal window and run the following.

###Install all the project dependencies then run the project.

	npm install;
	bower install


##Start the project

	grunt serve

This will now open a browser window showing you a single input box running on the port and location defined in the grunt script.  For this example it will be.

	http:localhost:9000/#/


##3. Run the Protractor tests
Create the third terminal window and run the following.

	grunt protractor:e2e

### Source

#### Pages
test/e2e/page
#### Modules
test/e2e/moudles
#### Tests
test/e2e/specs

You will see it pop up a selenium firefox browser and run the test.  After the test is finished it will close the browser window.

There will be information printed on the command line of the tests being run and assertions.


##4. Run the Protractor Cucumber tests
Reuse the third terminal window and run the following.

	grunt protractor:cucumber

### Source
**The root source is located in test/e2e/specs**

This uses the protractor astrolabe style tests. 

It reuses the source (pages and modules from above.)

#### Features
test/e2e/features/search.feature
#### Steps
test/e2e/features/steps/
#### Setup
test/e2e/features/setup/world.js

You will see it pop up a selenium firefox browser and run the test.  After the test is finished it will close the browser window.

There will be information printed on the command line of the tests being run and assertions.


#Notes

##using Chrome for running your tests
If you change to using chrome in the protractor.conf.js

	capabilities: { browserName: 'chrome'},

The browser window will open behind the terminal window.

##Grunt and watch
A grunt watch will trigger tasks based upon any changes for files that are being watched.

I have not included the files under end to end tests as a watch in grunt.

End to end tests are slow.  They start up browsers do interactions, wait for things to happen.

I do not want the whole test suite running until I have made all my changes.

Having browser windows pop up upon every save is pretty annoying and only after you have made all your changes is it valid to have the tests run.

Regular js tests run so fast via the browser or phantomjs it is valid to have the entire test suite run upon each save.

