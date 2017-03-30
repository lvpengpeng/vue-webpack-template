var webpack = require('webpack')
var config = require('./webpack.prod.conf')

webpack(config, function(err, stats) {
	if (err) throw err
  console.log(stats.toString({
  	colors: true,
  	chunks: false,
  	children: false
  }))
})
