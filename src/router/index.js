import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Nofind from '@/views/404'
import Layout from '@/components/Layout'
Vue.use(Router)
import store from '../store/store'
const router = new Router({
  routes: [
    {
      path:'/',
      redirect:'/index'
    },

    {
      path: '/',
      component:Layout,
      title:'layout',
      children:[
        {
          path: '/Index',
          component: Index,
          title: '系统首页'
        },

      ]
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
router.beforeEach((to, from, next) => {
  const isLogin = store.state.userInfo.token ? true : false;
  if (to.path == "/login" ) {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;
