// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.css'
import './static/css/animate.css'
import 'inspinia/dist/inspinia.css'
import 'inspinia/dist/fonts.css'
import iView from 'iview'
import store from './store/store'
import 'iview/dist/styles/iview.css'
import axios from 'axios'
Vue.use(iView);

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
