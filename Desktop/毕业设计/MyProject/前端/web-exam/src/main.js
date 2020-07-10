import Vue from 'vue'
import App from './App.vue'
import router from './router'

// import http from './ajax/api.js'
import vueAxios from 'vue-axios'
import Axios from 'axios'
import ElementUI from 'element-ui'
//样式引入
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
//拦截器
import interceptor from '@/plugins/interceptors.js'

import VueLocalStorage from 'vue-localstorage'

Vue.use(VueLocalStorage)

Vue.config.productionTip = false

Vue.use(vueAxios, Axios)

Vue.use(interceptor, router)

//写入封装的axios请求方法
// Vue.prototype.$http = http

// 解决同一路由反复点击报错问题
import Router from 'vue-router'

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
