import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'
import './css/common.css'
import routes from './routes'
import SmartUI from 'smart-ui'
import 'smart-ui/lib/smart-ui.css'
import App from './App'

Vue.use(Router)
Vue.use(SmartUI)

FastClick.attach(document.body)

const router = new Router({ routes })

new Vue({
  router,
  ...App
})
.$mount('#app')


