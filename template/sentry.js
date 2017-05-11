const package = require('./package.json')
const version = package.version

const user = ''
const project = ''
const urlPrefix = ''

function exec(command, callback) {
  const stdout = require('child_process')
    .execSync(command, { encoding: 'utf-8' })
  if (stdout) console.log(stdout)
}

exec(`sentry-cli releases -o ${user} -p ${project} new ${version}`)
exec(`sentry-cli releases -o ${user} -p ${project} files ${version} upload-sourcemaps --url-prefix ${urlPrefix} ./dist`)
