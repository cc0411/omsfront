<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">oms后台管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 用户头像 -->
        <div class="user-avator"><img :src="userInfo.image"></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{userInfo.name}} <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided  command="showInfoList">个人中心</el-dropdown-item>
            <el-dropdown-item divided  command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

</template>

<script>
  import bus from './bus';
    export default {
      name: "HeadNav",
      props:{
        userInfo:{
          required:true,
          type:Object,
        }
      },
      methods:{
        // 用户名下拉菜单选择事件
        handleCommand(cmditem) {
          if (!cmditem) {
            this.$message("菜单选项缺少command属性");
            return;
          }
          switch (cmditem) {
            case "info":
              this.showInfoList();
              break;
            case "logout":
              this.logout();
              break;
          }
        },
        showInfoList() {
          // 个人信息
          // this.$router.push("/infoshow");
          console.log('11111')
        },
        logout() {
          // 清除token
          localStorage.removeItem("token");
          localStorage.removeItem("name");
          this.$store.dispatch('logout');

            // 页面跳转
            this.$router.push("/login");
          },

        // 侧边栏折叠
        collapseChage(){
          this.collapse = !this.collapse;
          bus.$emit('collapse', this.collapse);
        },
      },
      mounted(){
        if(document.body.clientWidth < 1500){
          this.collapseChage();
        }
      }
      }



</script>

<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: #fff;
  }
  .collapse-btn{
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 70px;
  }
  .header .logo{
    float: left;
    width:250px;
    line-height: 70px;
  }
  .header-right{
    float: right;
    padding-right: 50px;
  }
  .header-user-con{
    display: flex;
    height: 70px;
    align-items: center;
  }
  .btn-fullscreen{
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
  }
  .btn-bell, .btn-fullscreen{
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-bell-badge{
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
  }
  .btn-bell .el-icon-bell{
    color: #fff;
  }
  .user-name{
    margin-left: 10px;
  }
  .user-avator{
    margin-left: 20px;
  }
  .user-avator img{
    display: block;
    width:40px;
    height:40px;
    border-radius: 50%;
  }
  .el-dropdown-link{
    color: #fff;
    cursor: pointer;
  }
  .el-dropdown-menu__item{
    text-align: center;
  }
</style>
