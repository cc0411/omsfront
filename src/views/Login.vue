<template>
  <div class="login-wrap">
    <div class="ms-login">
      <div class="ms-title">Welcome to OMS</div>
      <el-form :model="LoginUser" :rules="rules" ref="LoginForm" label-width="0px" class="ms-content">
        <el-form-item prop="username">
          <el-input v-model="LoginUser.username" placeholder="username">
            <el-button slot="prepend" icon="el-icon-cl-user"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="password" v-model="LoginUser.password" @keyup.enter.native="handleSubmit('LoginForm')">
            <el-button slot="prepend" icon="el-icon-cl-password"></el-button>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="handleSubmit('LoginForm')">登录</el-button>
        </div>
        <p class="login-tips" v-show="error">{{error}}</p>
      </el-form>
    </div>
  </div>
</template>

<script>
import {Login}  from "../api/api"

export default {
name: 'login',
  data () {
    return {
      LoginUser: {
        username: '',
        password: '',
      },
      error:false,
      rules: {
        username: [
          { required: true, message: '用户名不可以为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不可以为空', trigger: 'blur' },
          { min:8,message:"密码必须八位以上",trigger:'blur'}
        ],


      }
    }
  },
  methods: {
    handleSubmit (Formname) {
      var that = this;
      this.$refs[Formname].validate((valid) => {
        if (valid) {
          Login(this.LoginUser)
            .then(res=>{
            //存入本地存储
            localStorage.setItem("name", this.LoginUser.username)
            localStorage.setItem("token", res.data.token)
            // 存储数据到store
              that.$store.dispatch("login")
            //消息提醒并跳转首页
            this.$message.success("登陆成功");
            this.$router.push("/index")
          }).catch(function (error) {
            const err = error.response.data;
            if("non_field_errors" in err){
              that.error =err.non_field_errors[0];
            }
            if("username" in err){
              that.error=err.username[0];
            }
            if("password" in error){
              that.error=err.password[0];
            }
          })
        } else {
            this.$message.error('账号密码错误')
        }
      })
    },
  }
}

</script>
<style scoped>
  .login-wrap{
    position: relative;
    width:100%;
    height:100%;
    /*background-image: url(../../assets/login-bg.jpg);*/
    background-size: 100%;
  }
  .ms-title{
    width:100%;
    line-height: 50px;
    text-align: center;
    font-size:20px;
    color: #fff;
    border-bottom: 1px solid #ddd;
  }
  .ms-login{
    position: absolute;
    left:50%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-content{
    padding: 30px 30px;
  }
  .login-btn{
    text-align: center;
  }
  .login-btn button{
    width:100%;
    height:36px;
    margin-bottom: 10px;
  }
  .login-tips{
    font-size:12px;
    line-height:30px;
    color:red;
  }
</style>

