import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
// 先引入elementui库
import ElementUI from 'element-ui'
// 引入css
import 'element-ui/lib/theme-chalk/index.css'
// 自定义css样式
import './assets/css/index.css'
// 安装elemnrntui
Vue.use(ElementUI)

// 通过defaults给axios设置一个默认的baseURL,可以在所有请求中都能用到这个地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 设置axios的请求拦截器
axios.interceptors.request.use(function(config) {
  // config 可以拦截到请求相关的所有信息.这个信息可修改
  config.headers.Authorization = localStorage.getItem('token')
  return config
  // 这个函数中必须的内容,用来放行拦截的数据
})
// 设置axios的响应拦截器
// axios.interceptors.response.use(function (response) {
//   // Do something with response data
//   return response;
// }, function (error) {
//   // Do something with response error
//   return Promise.reject(error);
// });

// 把axios加到Vue的原型上
Vue.prototype.$http = axios
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
