<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 机房</el-breadcrumb-item>
        <el-breadcrumb-item>添加机房</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="idcform" :model="Idcinfo"  :rules="rules" label-width="80px">
          <el-form-item label="机房名" prop="name">
            <el-input v-model="Idcinfo.name"></el-input>
          </el-form-item>
          <el-form-item label="机房描述" prop="desc">
            <el-input type="textarea" rows="5" v-model="Idcinfo.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('idcform')">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import  {addIdc}  from '../../api/api'
export default {
name: 'addIdc',
  data(){
    return{
      Idcinfo:{
        name:'',
        desc:''
      },
      rules:{
        name: [
          { required: true, message: '机房名不可以为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    onSubmit(Formname) {
      this.$refs[Formname].validate((valid) => {
        if (valid) {
          addIdc(this.Idcinfo)
            .then(res=>{
              console.log(res)
               this.$message.success('添加成功！');
               this.$router.push("/idc")
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
