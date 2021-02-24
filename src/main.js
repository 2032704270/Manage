import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 封装的网络请求
import {request} from './network/axios'
Vue.prototype.$axios = request

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
