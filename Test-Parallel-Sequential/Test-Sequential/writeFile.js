var jsonfile = require('jsonfile')
var fs = require('fs')

var file = './tmp/data.json'
var obj = {username: 'tata'}

 
jsonfile.writeFile(file, obj, function (error) {
  if(error)
  console.log("Error in writing to file "+error); 
  else
console.log("Success in writing to file ");  
 
})

 
/*
jsonfile.writeFile(file, obj, function (err) {       
      fs.readFile(file, 'utf8', function (err, data) {         
        var obj2 = JSON.parse(data)         
        console.log(obj2);
        //console.log(data);         
      })
    })
*/