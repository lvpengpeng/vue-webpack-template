#!/usr/bin/env node

const fs = require('fs')
const semver = require('semver')
const colors = require('colors')
const readline = require('readline')
const ora = require('ora')

const package = require('./package.json')
const version = package.version

const assetsPath = ''
const viewsPath = ''

let complete = false
let newVersion = ''

const spinner = ora({ text: '', spinner: 'earth' })


function warnLog(message) {
  console.log(
    colors.yellow(message)
  )
}

function exec(command, callback) {
  const stdout = require('child_process')
    .execSync(command, { encoding: 'utf-8' })
  if (stdout) console.log(stdout)
}


function backup() {
  exec('cp package.json package.json.copy && mv dist tmp')
}

function rollback() {
  exec('mv package.json.copy package.json && rm -rf dist && mv tmp dist')
}

function cleanup() {
  exec('rm -rf tmp && rm package.json.copy')
}


function execBuild() {
  console.log(
    colors.magenta('==> start build...')
  )
  exec('node ./build/build.js')
  spinner.text = 'build success'
  spinner.succeed()
  afterBuild()
}

function afterBuild() {
  if (!viewsPath || !assetsPath) {
    warnLog('viewsPath or assetsPath is empty')
    return
  }
  exec(`cp dist/Index.phtml ${viewsPath} && cp -r dist/css dist/js ${assetsPath}`)
  spinner.text = 'release to production git-repo'
  spinner.succeed()
  complete = true

  console.log(
    colors.magenta('==> start sentry release...')
  )
  exec('node sentry.js')
  spinner.text = 'sentry release success'
  spinner.succeed()

  spinner.text = `v${newVersion} have released`
  spinner.succeed()
}

// 将新输入的 version 更新到 package.json
function updateVersion(newVersion) {
  let content = fs.readFileSync('./package.json', 'utf-8')
  content = content.replace(/("version"\:\s")[\d\.]+(",)/, `$1${newVersion}$2`)
  fs.writeFileSync('./package.json', content)
  spinner.text = `new version ${newVersion}`
  spinner.succeed()
  execBuild()
}

function readVersion() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.setPrompt(`release version: (${version}) `)

  rl.on('line', input => {
    if (!semver.valid(input)) {
      warnLog(`Invalid version: ${input}`)
      rl.prompt()
    }
    else if (!semver.gt(input, version)) {
      warnLog(`The new version must be greater than old version`)
      rl.prompt()
    }
    else {
      rl.close()
      newVersion = input
      updateVersion(input)
    }
  })

  rl.prompt()
}


process.on('exit', code => {
  if (complete === false) {
    rollback()
  } else {
    cleanup()
  }
})

// 备份
backup()

// 读取新的版本号
readVersion()


