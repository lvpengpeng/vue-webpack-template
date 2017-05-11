var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var InlineManifestPlugin = require('inline-manifest-webpack-plugin')

module.exports = {

  entry: {
    // 业务逻辑模块
    app: ['./main.js'],
    // 其他库文件
    vendor: [
      'vue',
      'vue-router',
      'axios',
      'bali.js',
      'fastclick',
      'qs',
      'smart-ui',
      'es6-promise',
      'raven-js',
      'raven-js/plugins/vue'
    ],
  },

  output: {
    path: path.resolve(__dirname, '../dist')
  },

  resolve: {
    extensions: ['.js', '.vue'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader'
      },
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),

    new InlineManifestPlugin({
      name: 'webpackManifest'
    }),
  ],

  node: {
    Buffer: false
  },

  context: path.resolve(__dirname, '../src'),
}
