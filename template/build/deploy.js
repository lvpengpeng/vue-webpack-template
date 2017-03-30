var Client = require('ftp');
var chalk = require('chalk');


function FtpDeploy(conf) {
  this.filesQueue = [];
  this.connected = false;
  this.client = new Client();
  this.hostname = conf.hostname;
  this.username = conf.username;
  this.password = conf.username;
  this.client.on('ready', this.onReady.bind(this));
  this.client.on('close', this.onClose.bind(this));
  this.client.on('error', this.hanleError.bind(this));
}

FtpDeploy.prototype.connect = function() {
  if (!this.connected) {
    this.client.connect({
      host: this.hostname,
      user: this.username,
      password: this.password,
      keepalive: 10000,
    });
  } else {
    // 已是连接状态，手动执行 ready
    setTimeout(function() {
      this.onReady();
    }.bind(this), 0);
  }
}

FtpDeploy.prototype.deploy = function(files) {
  this.filesQueue = files;
  this.connect();
}

FtpDeploy.prototype.upload = function() {
  var file = this.filesQueue.shift();
  if (!file) return;
  var source = file.source || file.filename;
  this.client.put(source, file.to, function(err) {
    var desc = chalk.cyan(`${file.filename} ${chalk.white('-->')} ${file.to}`);
    if (err) {
      console.log(chalk.red('upload failure :'), desc);
      throw err;
    } else {
      this.upload();
      console.log(chalk.green('upload success :'), desc);
    }
  }.bind(this));
}

FtpDeploy.prototype.onReady = function() {
  this.connected = true;
  // 连接成功后，开始上传文件
  this.upload();
  console.log();
}

FtpDeploy.prototype.onClose = function() {
  this.connected = false;
  // 连接关闭后，如果还有文件需要上传就再次发起连接
  if (this.filesQueue.length > 0) {
    this.connect();
  }
}

FtpDeploy.prototype.hanleError = function(err) {
  throw err;
}


var path = require('path');

/**
 * conf 账号配置
 * @conf.hostname 主机
 * @conf.username 账号
 * @conf.password 密码
 *
 * <Array>strategies 上传策略
 * @strategies.reg 匹配文件的正则表达式
 * @strategies.to  要上传到的服务器路径 
 *
 * example:
 *   new DeployPlugin({
 *     hostname: '',
 *     username: '',
 *     password: '',
 *   }, [
 *     {reg: /html$/, to: '/data1/htdocs/www.haha.com/app/views/'},
 *     {reg: /(js|css)$/, to: '/data1/htdocs/www.haha.com/public/static/'},
 *   ])
 */
function DeployPlugin(conf, strategies) {
  this.ftpClient = new FtpDeploy(conf);
  this.strategies = strategies;
}

DeployPlugin.prototype.apply = function(compiler) {
  var self = this;
  var strategies = this.strategies;
  
  compiler.plugin('done', function(stats) {
    var filesQueue = [];
    var assets = stats.compilation.assets;

    for (var filename in assets) {
      strategies.forEach(function(strategy) {
        var to = strategy.to;
        var file = assets[filename];
        if (strategy.reg.test(filename)) {
          filesQueue.push({
            size: file.size(),
            to: path.join(to, filename),
            filename: filename,
            source: new Buffer(file.source(), 'utf-8')
          });
        }
      });
    }

    self.ftpClient.deploy(filesQueue);
  });
}


module.exports = DeployPlugin;
