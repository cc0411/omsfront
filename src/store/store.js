//引入vue
import Vue from 'vue'
//全局引入vueX
import Vuex from 'vuex';

import mutations from './mutations';
import * as actions from './action';
import * as getters from './getters';

//全局注册vueX
Vue.use(Vuex);


const userInfo = {
  name:localStorage.getItem('name')||'',
  token:localStorage.getItem('token')||''
};

const state = {
  userInfo,
}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
