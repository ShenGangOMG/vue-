import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 先引入elementui库
import ElementUI from 'element-ui'
// 引入css
import 'element-ui/lib/theme-chalk/index.css'
// 自定义css样式
import './assets/css/index.css'
// 安装elemnrntui
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
