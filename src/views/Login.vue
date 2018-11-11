<template>
  <div class="middle-box text-center loginscreen animated fadeInDown">
    <div >
      <h3>Welcome to OMS</h3>
        <Form ref="LoginForm" :model="LoginUser" :rules="rules" :label-width="60" class="m-t">
          <FormItem label="用户名" prop="username" class="form-group">
            <Input v-model="LoginUser.username" placeholder="请输入用户名" ></Input>
          </FormItem>
          <FormItem label="密码" prop="password" class="form-group">
            <Input v-model="LoginUser.password" placeholder="请输入密码" type="password" ></Input>
          </FormItem>
          <FormItem >
            <Button type="primary" @click="handleSubmit('LoginForm')">登录</Button>
          </FormItem>
          <p  v-if="LoginUser.show" class="login-tips">Tips : 账号或者密码错误</p>
        </Form>
      <p class="m-t"> <small>corp: 运维管理系统 &copy; 2018</small> </p>
    </div>
  </div>
</template>

<script>
export default {
name: 'Login',
  data () {
    return {
      LoginUser: {
        username: '',
        password: '',
        show:false
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
    handleSubmit (name) {

      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$axios.post('http://127.0.0.1:8000/login/',this.LoginUser).then(res=>{
            //存入本地存储
            localStorage.setItem('token',res.data.token)
            // 解析token
            // const decode = jwt_decode(token);

            // 存储数据
            // this.$store.dispatch("setIsAutnenticated", !this.isEmpty(decode));
            // this.$store.dispatch("setUser", decode);
            this.$Message.success('Success!');
            this.$router.push("/index")
          })
        } else {
          this.LoginUser.show=true,
          this.$Messqge.error('Fail!');
        }
      })
    },
  }
}

</script>

<style scoped>
  .login-tips{
    font-size:12px;
    line-height:30px;
    color:red;
  }
</style>

