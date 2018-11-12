<template>
<div id="wrapper">
  <app-menus></app-menus>
  <div id="page-wrapper" class="gray-bg dashbard-1" style="min-height: 853px;">
    <app-header></app-header>
  <router-view></router-view>
    <app-footer></app-footer>
  </div>
</div>
</template>

<script>
  import  Header from '../components/Header'
  import Menus from '../components/Menus'
  import  Footer from '../components/Footer'
export default {
name: 'Index',
 components:{
  'app-header':Header,
   'app-menus':Menus,
   'app-footer':Footer


 }
}
</script>

<style scoped>

</style>
