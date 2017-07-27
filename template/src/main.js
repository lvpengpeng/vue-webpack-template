import Vue from 'vue'
{{#fastclick}}
import FastClick from 'fastclick'
{{/fastclick}}
{{#smartui}}
import SmartUI from 'smart-ui'
import 'smart-ui/lib/smart-ui.css'
{{/smartui}}
import router from './router'
import App from 'views/app'
{{#sentry}}


/**
 * 使用 https://sentry.io 收集应用异常
 */
import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

if (process.env.NODE_ENV === 'production') {
  Raven
    .config('', {
      release: window.__CONFIG__.version
    })
    .addPlugin(RavenVue, Vue).install()
}
{{/sentry}}


// promise polyfill
require('es6-promise').polyfill()
{{#fastclick}}


// 解决移动端 300ms 点击延迟问题
FastClick.attach(document.body)
{{/fastclick}}
{{#smartui}}

Vue.use(SmartUI)
{{/smartui}}

window.app = new Vue({ el: '#app',{{#router}} router,{{/router}} ...App })


