require('shelljs/global');
env.NODE_ENV = 'production';

var webpack = require('webpack');
var DeployPlugin = require('./deploy');
var config = require('./webpack.prod.conf');

config.output.publicPath = '';

config.plugins.push(
  new DeployPlugin({
    username: '',
    password: '',
    hostname: ''
  }, [
    {reg: /.*$/, to: ''},
  ])
);

webpack(config).watch({}, function(err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});
