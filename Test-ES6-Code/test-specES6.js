/*
describe('Protractor test with ES6', function() {
 //Disable Angular Detection
 beforeEach(function(){
       //disable angular detection
       // browser.ignoreSynchronization = true;
       browser. waitForAngularEnabled(false)
	});

  it('should have a title', function() {
    browser.get('https://www.google.co.in/');
    expect(browser.getTitle()).toEqual('Google');
   // browser.pause();
  });
}); 
*/


describe('Test with ES6', ()=>{
    beforeEach(()=> {
        browser.waitForAngularEnabled(false)
    })
    it('Verify the google title', ()=> {
        browser.get('https://www.google.co.in/');
        expect(browser.getTitle()).toEqual('Google');
        browser.pause();
    })
})
 