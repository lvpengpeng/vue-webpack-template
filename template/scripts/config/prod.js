require('shelljs/global')
env.NODE_ENV = 'production'

const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackChunkHash = require('webpack-chunk-hash')
const webpackConfig = require('./base')
const config = require('../../config')

const extractAppCss = new ExtractTextPlugin('css/app.[contenthash].css')
const extractLibCss = new ExtractTextPlugin('css/lib.[contenthash].css')

module.exports = webpackMerge(webpackConfig, {
  output: {
    publicPath: config.publicPath
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        loader: extractLibCss.extract({
          use: 'css-loader?minimize'
        })
      },
      {
        test: /\.styl$/,
        loader: extractAppCss.extract({
          use: ['css-loader?minimize', 'stylus-loader']
        })
      }
    ]
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
    }),
    extractAppCss,
    extractLibCss
  ]
})

