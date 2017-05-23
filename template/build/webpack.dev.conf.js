require('shelljs/global')
env.NODE_ENV = 'development'

var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var baseConfig = require('./webpack.base.conf')
var package = require('../package.json')

module.exports = webpackMerge(baseConfig, {
	// eval-source-map is faster for development
  devtool: 'source-map',

  module: {
  	rules: [
  		{
	      test: /\.vue$/,
	      loader: 'vue-loader',
	    },
	    {
	    	test: /\.css$/,
	    	loaders: ['style-loader', 'css-loader']
	    },
	    {
	    	test: /\.(styl)$/,
	    	loaders: ['style-loader', 'css-loader', 'stylus-loader']
	    }
  	]
  },

	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			apiPath: '',
      appVersion: package.version
		}),

		// 报错但不退出webpack进程
		new webpack.NoEmitOnErrorsPlugin(),
	]
})
