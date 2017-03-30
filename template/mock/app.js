var fs = require('fs')
var path = require('path')
var express = require('express')
module.exports = function(app) {
  app.all(/\/((?:api)\/.*)/, function(req, res) {
    var file = path.join(__dirname, req.params[0] + '.json')
    var data = fs.readFileSync(file, 'utf-8')
    setTimeout(function() {
      res.send(JSON.parse(data))
    }, 2000)
  })
}
