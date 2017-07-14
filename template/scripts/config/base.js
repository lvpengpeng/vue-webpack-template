const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ChunkManifestPlugin = require("chunk-manifest-webpack-plugin")
const helper = require('../helper')
const config = require('../../config')
const env = process.env.NODE_ENV

const extractAppCss = new ExtractTextPlugin('css/app.[contenthash].css')
const extractLibCss = new ExtractTextPlugin('css/lib.[contenthash].css')

module.exports = {
  context: config.root + '/src',

  devtool: 'source-map',

  entry: {
    // application code
    app: [
      './main.js'
    ],
    // other libs code
    vendor: config.vendor
  },

  output: {
    path: config.root + '/dist',
    filename: 'js/[name].[chunkhash].js',
    chunkFilename: "[name].[chunkhash].js",
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js'],
    alias: helper.alias()
  },

  module: {
    rules: [
      {
        test: /\.tpl$/,
        // https://github.com/ktsn/vue-template-loader
        loader: 'vue-template-loader',
        options: {
          transformToRequire: {
            img: 'src'
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // https://github.com/babel/babel-loader
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)(\?.*)$/,
        // https://github.com/webpack-contrib/url-loader
        loader: 'url-loader'
      },
      {
        test: /\.css$/,
        use: helper.cssLoaders('css', extractLibCss)
      },
      {
        test: /\.styl$/,
        use: helper.cssLoaders('stylus', extractAppCss)
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${env}"`
    }),

    new ChunkManifestPlugin({
      filename: 'manifest.json',
      manifestVariable: 'webpackManifest',
      inlineManifest: true
    }),

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin(
      helper.htmlPluginOptions()
    ),

    extractAppCss,
    extractLibCss
  ],

  // does not polyfill or mock any Node api
  node: env === 'production' ? false : {}
}
