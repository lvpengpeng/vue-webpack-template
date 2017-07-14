require('shelljs/global')
env.NODE_ENV = 'production'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const WebpackChunkHash = require('webpack-chunk-hash')
const webpackConfig = require('./base')
const config = require('../../config')

module.exports = webpackMerge(webpackConfig, {
  output: {
    publicPath: config.publicPath
  },

  plugins: [
    // custom chunk hash
    // https://github.com/alexindigo/webpack-chunk-hash
    new WebpackChunkHash(),
    // using hash as module id instead of index
    new webpack.HashedModuleIdsPlugin(),
    // compress js
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    })
  ]
})

