// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import store from './store/store'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'
import './icons'
import './styles/index.scss'
import axios from 'http'
Vue.use(ElementUI);

Vue.config.productionTip = false;
//挂载原型上
Vue.prototype.$axios = axios;



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
