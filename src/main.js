// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
       // 浅绿色主题
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
// import '../static/css/theme-green/index.css';

import 'font-awesome/css/font-awesome.min.css'
import './icon/iconfont.css'
import  * as filters  from './filters'    //引入全局过滤器
import './http'
import "babel-polyfill";
import Axios from 'axios'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http =Axios;


Vue.use(ElementUI,{size:'small'});
Vue.config.productionTip = false;

//注册全局过滤器
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key])
})




/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
