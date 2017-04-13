require('shelljs/global')
env.NODE_ENV = 'production'

var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlInlineSourcePlugin = require('html-webpack-inline-source-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var baseConfig = require('./webpack.base.conf')

module.exports = webpackMerge(baseConfig, {

	devtool: 'source-map',

	output: {
		filename: 'js/[name].[chunkhash].js',
    chunkFilename: 'js/[id].[chunkhash].js'
	},

	module: {
  	rules: [
  		{
	      test: /\.vue$/,
	      loader: 'vue-loader',
	      options: {
          loaders: {
            stylus: ExtractTextPlugin.extract({
              loader: 'css-loader?minimize!stylus-loader?sourceMap'
            })
          }
        }
	    },
	    {
	    	test: /\.css$/,
	    	loader: ExtractTextPlugin.extract('css-loader?minimize&sourceMap')
	    },
	   	{
	    	test: /\.(styl)$/,
	    	loader: ExtractTextPlugin.extract(['css-loader?minimize', 'stylus-loader'])
	    }
  	]
  },

	plugins: [
		new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './index.html',
			// more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
			minify: {
				removeComments: true,
				collapseWhitespace: true,
	      collapseInlineTagWhitespace: true,
			},
			inlineSource: 'manifest.js$',
			apiPath: ''
		}),

		// inline source
		new HtmlInlineSourcePlugin(),

		// uglify js
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),

    // extract css into its own file
    new ExtractTextPlugin('css/[name].[contenthash].css'),
	]
})

