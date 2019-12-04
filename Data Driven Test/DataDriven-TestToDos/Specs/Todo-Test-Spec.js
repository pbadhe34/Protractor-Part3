//Suite in Jasmine
describe('angular todo list app test', function() { 
  // Test in Jasmine
  it('should be able to add a todo item', function() { 
    // Entering application url in browser
    browser.get('http://localhost:8090/DataDriven-TestToDos/?');

    //Simulate- Enter text under TODO input field
    element(by.model('todoText')).sendKeys('write first protractor test');
    // Clicks on 'Add' button
    element(by.css('[value="add"]')).click(); 

    // Getting all Todo lists displayed
    var todoList = element.all(by.repeater('todo in todos'));

    // Asserting the TODO's count after addition as 6
    expect(todoList.count()).toEqual(6);
    //Verifying newly entered TODO is added
    expect(todoList.get(5).getText()).toEqual('write first protractor test');
    browser.pause();
  });
});