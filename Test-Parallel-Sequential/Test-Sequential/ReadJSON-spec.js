
var jsonfile = require('jsonfile')
var file = './tmp/data.json'


describe('Protractor Test App2', function() {
  it('Reading the json data', function()  {
    //disable angular detection for non-angular sites
    browser.ignoreSynchronization = true
    console.log("reading the json data");
    browser.get('http://google.com/');
  //  expect(browser.getTitle()).toEqual('Yahoo');

  jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})

  });
}); 

 