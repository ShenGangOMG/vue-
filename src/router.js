import Vue from 'vue'
import Router from 'vue-router'
// 引入Login登录页面
import Login from './views/Login/Login.vue'
// 引入Home主页
import Home from './views/Home/Home.vue'
import User from './views/User/User.vue'
import Roles from './views/Roles/Roles.vue'
import Rights from './views/Rights/Rights.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/user',
          component: User
        },
        {
          path: '/roles',
          component: Roles
        },
        {
          path: '/rights',
          component: Rights
        },
        {
          // 如果链接不给指定页面redirect重定向到主页,如果未登陆,导航守卫会将页面定位到登陆页
          path: '/',
          redirect: '/home'
        }
      ]
    }
  ]
})
//注册一个导航守卫
router.beforeEach((to, form, next) => {
  // 判断用户访问的是否为登陆页面,如果是放行
  if (to.path === '/login') {
    next()
    return
  }
  // 如果其他页面,判断是否登陆,登陆放行,未登陆跳转到登录页
  // token令牌用于判断用户是否登陆
  if (localStorage.getItem('token')) {
    next()
  } else {
    router.push('/login')
  }
})
// next 是导航守卫的方法,用于进行页面跳转,如果没有这个方法就不会进入页面
export default router
