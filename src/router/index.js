import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Nofind from '@/views/404'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },

    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path:'/login',
      name:'Login',
      component:Login
    },
    {
      path:'*',
      name:'404',
      component:Nofind
    }

  ],
  mode:'history'
})


// 添加路由守卫
// router.beforeEach((to, from, next) => {
//   const isLogin = localStorage.token ? true : false;
//   if (to.path == "/login" ) {
//     next();
//   } else {
//     isLogin ? next() : next("/login");
//   }
// })

export default router;
