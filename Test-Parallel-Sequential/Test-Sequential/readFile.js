var jsonfile = require('jsonfile')
var file = './tmp/data.json'
jsonfile.readFile(file, function(err, obj) {
  console.dir(obj)
})