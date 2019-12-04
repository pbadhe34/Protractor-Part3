describe('element present test',function(){
    beforeEach(function(){
       //disable angular detection
        browser.ignoreSynchronization = true;
	});
    
    it('Test for the element', function(){
        browser.driver.get('http://localhost:8090/Element-Test/')
        expect($('#div1').isPresent()).toBe(true)
         browser.debugger();

 
    })
})