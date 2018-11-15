import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Nofind from '@/views/404'
import Hosts  from '@/views/hosts/Hosts'
import Idcs  from '@/views/hosts/Idcs'
import Roles  from '@/views/hosts/Roles'
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
      meta:{title:'layout'},
      children:[
        {
          path: '/index',
          component: Index,
          meta:{title: '系统首页'}
        },
        {
          path: '/hosts',
          component: Hosts,
          meta:{title: '主机管理'}
        },
        {
          path: '/idc',
          component: Idcs,
          meta:{title: '机房管理'}
        },
        {
          path: '/role',
          component: Roles,
          meta:{title: '角色管理'}
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
