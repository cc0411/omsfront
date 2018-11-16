//引入vue
import Vue from 'vue'
//全局引入vueX
import Vuex from 'vuex';
//全局注册vueX
Vue.use(Vuex);
const types = {
 LOGIN :'LOGIN',
 LOGOUT : 'LOGOUT',
 ROLE:'ROLE',
 IDC:'IDC',
 BUSINESSUNIT:'BUSINESSUNIT'

}
const userInfo = {
  name:localStorage.getItem('name')||'',
  token:localStorage.getItem('token')||''
};
const  rolesdata ={}
const businessunitsdata={}
const idcsdata={}
const state = {
  userInfo,
  rolesdata,
  businessunitsdata,
  idcsdata,
}
const  getters = {
  userInfo :state =>state.userInfo,
  rolesdata:state=>state.rolesdata,
  idcsdata:state=>state.idcsdata,
  businessunitsdata:state=>state.businessunitsdata,

}
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
      token:null      }  } ,
  [types.ROLE](state,data) {
    state.rolesdata = data
  },
  [types.IDC](state,data){
    state.idcsdata =data
  },
  [types.BUSINESSUNIT](state,data){
    state.businessunitsdata =data
  },

};
const actions = {
  login:({commit}) =>{
    commit(types.LOGIN)},
  logout:({commit})=>{
    commit(types.LOGOUT)},
}
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions
});
