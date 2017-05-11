var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.dev.conf')
var utils = require('./utils')

var localIP = utils.getIP()
// 本地开发服务
var localServer = 'http://'+ localIP +':8080'

// 是否使用热更新
var useHot = true

var entryMixins = [
	// bundle the client for webpack-dev-server
  // and connect to the provided endpoint
	'webpack-dev-server/client?' + localServer
]

if (useHot) {
	// bundle the client for hot reloading
  // only- means to only hot reload for successful updates
	entryMixins.push('webpack/hot/only-dev-server')
	// activates HMR
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
	// prints more readable module names in the browser console on HMR updates
	config.plugins.push(new webpack.NamedModulesPlugin())
}

config.entry['app'] = entryMixins.concat(config.entry['app'])

var server = new WebpackDevServer(webpack(config), {
	hot: useHot,
	stats: { colors: true, chunks: false },
  disableHostCheck: true,
	// proxy: {
	//   '/api': {
	//     target: 'http://192.168.1.91',
	//     secure: false
	//   }
	// },
})

server.listen(8080, function() {
	console.log('\n ==> '+ localServer +' \n')
})

// start mock server
require('../mock/app')(server.app)
