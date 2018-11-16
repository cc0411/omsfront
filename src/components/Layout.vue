<template>
  <div class="wrapper">
    <app-header :userInfo="userInfo"></app-header>
    <app-menus></app-menus>
    <div class="content-box" :class="{'content-collapse':collapse}">
      <app-tags></app-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <router-view :userInfo="userInfo" ></router-view>
          </keep-alive>
        </transition>
      <app-footer></app-footer>
      </div>
    </div>
  </div>
</template>

<script>
import  HeadNav from '../components/HeadNav'
import  Menus from '../components/Menus'
import  Tags from '../components/Tags'
import  Footer from '../components/Footer'
import bus from './bus';
import {getUserDetail} from '../api/api'
export default {


name: 'Layout',
  data(){
    return {
      tagsList: [],
      collapse: false,
      userInfo:{},
    }
  },
 components:{
  'app-header':HeadNav,
   'app-menus':Menus,
   'app-tags':Tags,
   'app-footer':Footer
 },

  created(){

    bus.$on('collapse', msg => {
      this.collapse = msg;
    })
    this.getUserInfo(),
    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on('tags', msg => {
      let arr = [];
      for(let i = 0, len = msg.length; i < len; i ++){
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    })
  },
  methods:{
  //获取用户个人信息
    getUserInfo () { //请求用户信息
      getUserDetail().then((response)=> {
        this.userInfo = response.data;

      }).catch(function (error) {
        console.log(error);
      });
    },
  }
}
</script>

<style scoped>

</style>
