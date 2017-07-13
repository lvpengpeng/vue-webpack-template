require('shelljs/global')
env.NODE_ENV = 'development'

var webpack = require('webpack')
var webpackMerge = require('webpack-merge')
var webpackConfig = require('./base')

module.exports = webpackMerge(webpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader']
      }
    ]
  }
})
