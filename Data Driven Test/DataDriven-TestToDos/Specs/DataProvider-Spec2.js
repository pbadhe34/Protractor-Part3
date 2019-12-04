var tagLines = require('./data/TestData2.js');
var using = require('jasmine-data-provider');

describe('Insert selenium javascript library\'s tagline options', function () {

   beforeEach(function () {
        browser.get('http://localhost:8090/DataDriven-TestToDos/?');

    });

    using(tagLines.options, function (data) {
        it("Insert taglines of selenimum  tool", function () {
            element(by.model('todoText')).sendKeys(data.tagline);

            console.log("Adding the item "+data.tagline);

            // Clicks on 'Add' button
            element(by.css('[value="add"]')).click();
             // Getting all Todo lists displayed
            var todoList = element.all(by.repeater('todo in todos'));
            // Asserting the TODO's count  
            expect(todoList.count()).toEqual(6);
            //Verifying newly entered TODO is added
            expect(todoList.get(5).getText()).toEqual(data.tagline);
        });
         
    });
});