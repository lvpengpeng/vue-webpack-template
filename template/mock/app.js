const express = require('express')
const bodyParser = require('body-parser')
const utils = require('./utils')
const app = express()

app.use(bodyParser.json())


function handler(req, res) {
  // get corresponding config for current request
  const conf = utils.readJSON(__dirname + req.path + '.json')
  const responseName = conf.responseName

  // paging
  if (conf.isPaging && conf.datasource.indexOf(responseName) === 0) {
    let datasource = utils.getValue(conf.response, conf.datasource)
    let page = req.query.page || req.body.page || 1
    utils.setValue(conf.response, conf.datasource, utils.paging(datasource, page, 2))
  }

  // get response
  const response = conf.response[responseName]

  // simulate network latency
  setTimeout(() => {
    res.send(response)
  }, conf.delay)
}


app.all('*', handler)

app.listen(3000, () => {})
