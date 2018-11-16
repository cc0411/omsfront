import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Index from '@/views/Index'
import Nofind from '@/views/404'
import Hosts  from '@/views/hosts/Hosts'
import addHost  from '@/views/hosts/addHost'
import addIdc  from '@/views/hosts/addIdc'
import Idcs  from '@/views/hosts/Idcs'
import addRole  from '@/views/hosts/addRole'
import Roles  from '@/views/hosts/Roles'
import BusinessUnit  from '@/views/hosts/BusinessUnit'
import addBusinessUnit  from '@/views/hosts/addBusinessUnit'
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
          path: '/hosts/add',
          component: addHost,
          meta:{title: '添加主机'}
        },
        {
          path: '/idc',
          component: Idcs,
          meta:{title: '机房管理'}
        },
        {
          path: '/idc/add',
          component: addIdc,
          meta:{title: '添加机房'}
        },
        {
          path: '/role',
          component: Roles,
          meta:{title: '角色管理'}
        },
        {
          path: '/role/add',
          component: addRole,
          meta:{title: '添加角色'}
        },
        {
          path: '/businessunit',
          component: BusinessUnit,
          meta:{title: '业务线管理'}
        },

        {
          path: '/businessunit/add',
          component: addBusinessUnit,
          meta:{title: '添加业务线'}
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
  // mode:'history'
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
