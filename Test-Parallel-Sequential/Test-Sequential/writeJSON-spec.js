
var jsonfile = require('jsonfile')
var fs = require('fs')

var file = './tmp/data.json'
var obj = {username: 'Myjson'}


describe('Protractor Test App1', function() {
  it('Writing the jsoin data to file', function()  {
    //disable angular detection for non-angular sites
    browser.ignoreSynchronization = true
    
    browser.get('http://goggle.co.in');

    browser.getTitle().then(function(data){
     obj = {title: 'My Text'+data};

jsonfile.writeFile(file, obj, function (error) {
  if(error)
  console.log("Error in writing to file "+error); 
  else
console.log("Success in writing to file ");  
 
})

});
  //  expect(browser.getTitle()).toEqual('Google');



  });
}); 

 