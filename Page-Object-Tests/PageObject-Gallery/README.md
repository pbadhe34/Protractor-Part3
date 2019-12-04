The following article orignally appears at [dev9 website] (http://www.dev9.com/article/2015/1/protractor-using-the-page-object-model) on January 15th 2015 by Girma Nigusse

# Protractor: Using the Page Object Model

Protractor is an end-to-end (e2e) test automation framework for AngularJS application. It is an open source Node.js program built on top of WebDriverJS originally developed by a team at Google. Test cases written in Protractor run in the browser simulating the actions of a real user. An e2e test written in Protractor makes sure your application behaves as expected.

## Challenge: Code Duplication

There is always duplication in test cases. For instance login, find, and logout are clearly duplicated in the following two test cases:

**Test case 1:** login to the website, find an item, add it to my wish list and logout.

**Test case 2:** login to the website, find an item, add it to cart, purchase and logout.

Duplicate test cases result in code duplication. An e2e test suite with code duplication is difficult to maintain and requires costly modifications. In this tutorial, we will implement a page object design best practice for Protractor to minimize code duplication, make tests more readable, reduce the cost of modification, and improve maintainability.  

The most important concept here is to separate the abstraction of the test object (the page) and the test script (the spec). Hence, a single test object can be used multiple times by test scripts without rewriting it.

## Using the PhoneCat application

We will use the popular AngularJS PhoneCat application to demonstrate how Protractor tests could make use of the page object design pattern to create simple and maintainable e2e test automation.

A concise instruction set, on how to setup the PhoneCat application in your local machine, is at the end of this post.

## Abstraction: Separation of Test Object from Test Script

The PhoneCat app has the ‘phones list view’ page where all available phones are listed. A user can search or change the order of the listed phones on the page. When selecting a phone from the list, a user navigates to the ‘phone details view’ page, where more details about the selected phone are included.

In line with the page object design pattern best practice: the PhoneCat application has two test objects, the phones list view page and the phone details view page. Each of the pages should be self-contained, meaning they should provide all the locators and functions required to interact with each page. For example, the phones list view page should have a locator for the search input box and a function to search.

The image below shows the separation of the test object (page object files) from the test script (spec files). The spec files under the spec folder contain only test scripts. The page object files under the page object folder contain page specific locators and functions.

### Test Object - Page Object

The PhoneCat application have the phones list page and the phone details page. The following two page object files provide the locators and functions required to interact with these pages. 

```javascript
Phones = {
    elements: {
        _search: function () {
            return element(by.model('query'));
        },

        _sort: function(){
            return element(by.model('orderProp'));
        },

        _phoneList: function(){
            return element.all(by.repeater('phone in phones'));
        },

        _phoneNameColumn: function(){
            return  element.all(by.repeater('phone in phones').column('phone.name'));
        }
    },

    _phonesCount: function(){
        return this.elements._phoneList().count();
    },

    searchFor: function(word){
        this.elements._search().sendKeys(word);
    },

    clearSearch: function(){
        this.elements._search().clear();
    },

    _getNames: function(){
        return this.elements._phoneNameColumn().map(function(elem){
            return elem.getText();
        });
    },

    sortItBy: function(type){
        this.elements._sort().element(by.css('option[value="' + type + '"]')).click();
    },

    selectFirstPhone : function(){
        element.all(by.css('.phones li a')).first().click();
        return require('./phone.details.page.js');
    }
};

module.exports = Phones;
```

**Listing 1: test/page_objects/phones.page.js**

```javascript
PhonesDetails = {
    elements:{
        _name: function(){
            return element(by.binding('phone.name'));
        },

        _image: function(){
            return element(by.css('img.phone.active'));
        },

        _thumbnail: function(index){
            return element(by.css('.phone-thumbs li:nth-child(' + index + ') img'));
        }
    },

    _getName: function(){
        return this.elements._name().getText();
    },

    _getImage: function(){
        return this.elements._image().getAttribute('src');
    },

    clickThumbnail: function(index){
        this.elements._thumbnail(index).click();
    }
};

module.exports = PhonesDetails;
```

**Listing 2: test/page_objects/phone.details.page.js**

### Test Script - spec

The test script can now make use of the page object files. All the functions required to interact with the page (the test object) are encapsulated in the page object and the test scripts are more readable and concise.

```javascript
describe('Phone list view', function(){

    var phones = require('../page_objects/phones.page.js');

    beforeEach(function() {
        browser.get('app/index.html#/phones');
    })

    it('should filter the phone list as a user types into the search box', function() {
        expect(phones._phonesCount()).toBe(20);

        phones.searchFor('nexus');
        expect(phones._phonesCount()).toBe(1);

        phones.clearSearch();
        phones.searchFor('motorola');
        expect(phones._phonesCount()).toBe(8);
    });

    it('should be possible to control phone order via the drop down select box', function() {
        phones.clearSearch();
        phones.searchFor('tablet'); //let's narrow the dataset to make the test assertions shorter

        expect(phones._getNames()).toEqual([
            "Motorola XOOM\u2122 with Wi-Fi",
            "MOTOROLA XOOM\u2122"
        ]);

        phones.sortItBy('name');

        expect(phones._getNames()).toEqual([
            "MOTOROLA XOOM\u2122",
            "Motorola XOOM\u2122 with Wi-Fi"
        ]);
    });

    it('should render phone specific links', function() {
        phones.clearSearch();
        phones.searchFor('nexus');
        phones.selectFirstPhone();
        browser.getLocationAbsUrl().then(function(url) {
            expect(url.split('#')[1]).toBe('/phones/nexus-s');
        });
    });
});
```

**Listing 3: test/spec/phones.spec.js**

```javascript
describe('Phone detail view', function(){

    var phones = require('../page_objects/phones.page.js'),
        phoneDetails;

    beforeEach(function() {
        browser.get('app/index.html#/phnes');
        phones.searchFor('nexus');
        phoneDetails = phones.selectFirstPhone();
    });


    it('should display nexus-s page', function() {
        expect(phoneDetails._getName()).toBe('Nexus S');
    });

    it('should display the first phone image as the main phone image', function() {
        expect(phoneDetails._getImage()).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });

    it('should swap main image if a thumbnail image is clicked on', function() {
        phoneDetails.clickThumbnail(3);
        expect(phoneDetails._getImage()).toMatch(/img\/phones\/nexus-s.2.jpg/);

        phoneDetails.clickThumbnail(1);
        expect(phoneDetails._getImage()).toMatch(/img\/phones\/nexus-s.0.jpg/);
    });
});
```

**Listing 4: test/spec/phone.details.spec.js**

In conclusion, when a page object design pattern is properly used in a Protractor test automation, it will make an e2e test easy to maintain and reduce code duplication.


### Running the test
1. Install Git and Node.js
2. Clone the angular-phonecat repository, $ git clone --depth=14 https://github.com/xgirma/angular-phonecat.git
3. Change your current directory to angular-phonecat ($ cd angular-phonecat). Download the tool dependencies by running ($ npm install).
4. Use npm helper scripts to start a local development web-server($ npm start). This will create a local webserver in your machine, listening to port 8000. Browse the application at http://localhost:8000/app/index.html
5. To install the drivers needed by Protractor ($ npm run update-webdriver) and to run the Protractor end to end tests ($ npm run protractor).

Refer to the AngularJS [tutorial site] (https://docs.angularjs.org/tutorial/step_00) for complete instructions. Final note: If you want to try the code samples given in this tutorial,  besides creating folders, the page object files, and the spec files, you need to change the path to the the new spec files in protractor-cof.js file. Simply change **spec:[‘e2e/*.js’]** to **spec:[‘e2e/spec/*.spec.js’]** or to a path where you put the spec files.

### Related Works

1. [Using Page Objects to Organize Tests] (https://github.com/angular/protractor/blob/master/docs/page-objects.md)
2. [Using Page Objects to Overcome Protractor's Shortcomings] (http://www.thoughtworks.com/insights/blog/using-page-objects-overcome-protractors-shortcomings)
3. [Getting Started with Protractor and Page Objects for AngularJS E2E Testing] (https://teamgaslight.com/blog/getting-started-with-protractor-and-page-objects-for-angularjs-e2e-testing)

## Application Directory Layout

    app/                --> all of the files to be used in production
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      index.html        --> app layout file (the main html template file of the app)
      js/               --> javascript files
        app.js          --> the main application module
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
        animations.js   --> hooks for running JQuery animations with ngAnimate
      partials/         --> angular view partials (partial html templates) used by ngRoute
        partial1.html
        partial2.html
      bower_components  --> 3rd party js libraries, including angular and jquery
    scripts/            --> handy scripts
      update-repo.sh       --> pull down the latest version of this repos
                               (BE CAREFUL THIS DELETES ALL CHANGES YOU HAVE MADE)
      private/             --> private scripts used by the Angular Team to maintain this repo
    test/               --> test source files and libraries
      karma.conf.js        --> config file for running unit tests with Karma
      protractor-conf.js   --> config file for running e2e tests with Protractor
      e2e/
        page_objects/
            phone.details.page.js   --> end-to-end page object (ADDED)
            phones.page.js          --> end-to-end page object (ADDED)
        spec/
            phone.details.spec.js   --> end-to-end spec (ADDED)
            phones.spec.js          --> end-to-end spec (ADDED)
        scenarios.js       --> end-to-end specs
      unit/             --> unit level specs/tests
        controllersSpec.js --> specs for controllers
        directivesSpec.js  --> specs for directives
        filtersSpec.js     --> specs for filters
        servicesSpec.js    --> specs for services
