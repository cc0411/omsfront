import * as types from './mutations-type'

import Vue from 'vue';
import axios from 'axios';
Vue.prototype.$axios = axios


export default {
  [types.SET_INFO] (state) {
    state.userInfo = {
      name:localStorage.getItem('name'),
      token:localStorage.getItem('token')
    }
    console.log(state.userInfo);
  },}

