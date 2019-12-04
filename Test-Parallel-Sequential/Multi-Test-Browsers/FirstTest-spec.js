describe("app home page", function(){
  it("should test the dynamic response", function(){
    
    browser.ignoreSynchronization = true


    browser.get('http://localhost:8090/first-test');

    element(by.tagName("button")).click();

    var elementText = element(by.tagName("h1")).getText();

    console.log(elementText);

    expect(elementText).toEqual('Welcome Users!');
     browser.debugger();


  });
});