import Vue from 'vue'
import Router from 'vue-router'
// 引入Login登录页面
import Login from './views/Login.vue'
// 引入Home主页
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    }
  ]
})
