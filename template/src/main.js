require('es6-promise').polyfill()
import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'
import './css/common.css'
import routes from './routes'
import SmartUI from 'smart-ui'
import 'smart-ui/lib/smart-ui.css'
import App from './App'

// // error tracking
// import Raven from 'raven-js'
// import RavenVue from 'raven-js/plugins/vue'

// if (process.env.NODE_ENV === 'production') {
//   Raven
//     .config('', {
//       release: __CONFIG__.version
//     }).addPlugin(RavenVue, Vue).install()
// }

Vue.use(Router)
Vue.use(SmartUI)

FastClick.attach(document.body)

const router = new Router({ routes })

window.app = new Vue({
  router,
  ...App
})
.$mount('#app')


