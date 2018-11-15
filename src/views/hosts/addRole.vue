<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 角色</el-breadcrumb-item>
        <el-breadcrumb-item>添加角色</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="roleform" :model="Roleinfo"  :rules="rules" label-width="80px">
          <el-form-item label="角色名" prop="name">
            <el-input v-model="Roleinfo.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="desc">
            <el-input type="textarea" rows="5" v-model="Roleinfo.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('roleform')">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
  import  {addRole}  from '../../api/api'
export default {
name: 'addRole',
  data(){
    return{
      Roleinfo:{
        name:'',
        desc:''
      },
      rules:{
        name: [
          { required: true, message: '角色名不可以为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    onSubmit(Formname) {
      this.$refs[Formname].validate((valid) => {
        if (valid) {
          addRole(this.Roleinfo)
            .then(res=>{
              this.$message.success('添加成功！');
              this.$router.push("/role")
            })
        } else {
          this.$message.error('添加失败')
        }
      })

    }
  }
}
</script>

<style scoped>

</style>
