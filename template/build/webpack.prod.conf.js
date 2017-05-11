require('shelljs/global')
env.NODE_ENV = 'production'

var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var WebpackChunkHash = require('webpack-chunk-hash')
var baseConfig = require('./webpack.base.conf')
var package = require('../package.json')

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
              use: 'css-loader?minimize!stylus-loader?sourceMap'
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
      filename: 'Index.phtml',
      template: './index.html',
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
      minify: {
        minifyJS: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
      },
      apiPath: '',
      appVersion: package.version
    }),

    new webpack.HashedModuleIdsPlugin(),
    new WebpackChunkHash(),

    // uglify js
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),

    // extract css into its own file
    new ExtractTextPlugin('css/[name].[contenthash].css'),
  ]
})

