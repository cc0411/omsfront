//引入vue
import Vue from 'vue'
//全局引入vueX
import Vuex from 'vuex';
//全局注册vueX
Vue.use(Vuex);
const types = {
 LOGIN :'LOGIN',
 LOGOUT : 'LOGOUT'
}
const userInfo = {
  name:localStorage.getItem('name')||'',
  token:localStorage.getItem('token')||''
};
const state = {userInfo,}
const  getters = {userInfo :state =>state.userInfo}
const  mutations = {
  [types.LOGIN] (state) {
    state.userInfo = {
      name:localStorage.getItem('name'),
      token:localStorage.getItem('token')
    }
  },
  [types.LOGOUT](state){
    state.userInfo = {
      name:null,
      token:null      }  }  }
const actions = {
  login:({commit}) =>{
    commit(types.LOGIN)},
  logout:({commit})=>{
    commit(types.LOGOUT)}
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
