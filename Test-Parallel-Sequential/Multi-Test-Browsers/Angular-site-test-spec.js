describe('Protractor Demo App', function() {
  it('should have a title', function() {
     browser.ignoreSynchronization = true

    browser.get('https://www.google.co.in/');
    expect(browser.getTitle()).toEqual('Google');

//Run as protractor debug protractor.conf.js
    browser.debugger();
  });
}); 

 