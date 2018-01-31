import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'

const baseURL = 'http://47.104.129.0:8080/'
axios.defaults.baseURL = baseURL
axios.defaults.headers.common['Authorization'] = 'whwlzhygl ' + localStorage.getItem('loginkey')

Vue.prototype.$baseURL = baseURL
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
