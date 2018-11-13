<template>
  <div class="login-container">

          <el-form ref="LoginForm" :model="LoginUser" :rules="rules" class="login-form" auto-complete="on" label-position="left">
          <div class="title-container">
            <h3 class="title">Welcome to OMS</h3>
          </div>
            <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
              <el-input
                v-model="LoginUser.username"
                placeholder="请输入用户名"
              />
            </el-form-item>

          <el-form-item  prop="password" >
            <span class="svg-container">
              <svg-icon icon-class="password"/>
            </span>
            <el-input v-model="LoginUser.password" placeholder="请输入密码" type="password"></el-input>
          </el-form-item>

            <el-button  type="primary" style="width:100%;margin-bottom:30px;" @click="handleSubmit('LoginForm')">登录</el-button>

        </el-form>

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

      this.$refs[Formname].validate((valid) => {
        if (valid) {
          Login(this.LoginUser)
            .then(res=>{
            //存入本地存储
            localStorage.setItem("name", this.LoginUser.username)
            localStorage.setItem("token", res.data.token)
            // 存储数据到store
            // this.$store.dispatch("setInfo")
              this.$store.dispatch("login")
            //消息提醒并跳转首页
            this.$message.success("登陆成功");
            this.$router.push("/index")
          })
        } else {
            this.$message.error('账号密码错误')
        }
      })
    },
  }
}

</script>
<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;
  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }
  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>

