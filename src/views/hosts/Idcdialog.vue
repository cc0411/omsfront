<template>
  <div class="idcdialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body ="false"
    >
      <div class="form">
        <el-form ref="idcform" :model="FormData"  :rules="rules" label-width="80px">
          <el-form-item label="机房名" prop="name">
            <el-input v-model="FormData.name"></el-input>
          </el-form-item>
          <el-form-item label="机房描述" prop="desc">
            <el-input type="textarea" rows="5" v-model="FormData.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="error-text" v-show="error">{{error}}</p>
            <el-button type="primary" @click="onSubmit('idcform')">提交</el-button>
            <el-button @click="dialog.show=false">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import  {addIdc,updateIdc}  from '../../api/api'
export default {
name: 'Idcdialog',
  props:{
    dialog:Object,
    FormData:Object,
    rowdata:Object,
  },
  data(){
    return {
      error:false,
      rules:{
        name: [
          { required: true, message: '机房名不可以为空', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    onSubmit(Formname) {
      var that = this
      this.$refs[Formname].validate((valid) => {
        if (valid) {
          const option = this.dialog.option=="add"?addIdc(this.FormData):updateIdc(this.rowdata.id,this.FormData);
          option.then(res=>{
            this.$message.success('添加更新成功');
            this.dialog.show=false;
            this.$emit('updateidcs')
          }).catch(function (error) {
            const err = error.response.data;
            if("non_field_errors" in err){
              that.error =err.non_field_errors[0];
            }
            if("name" in err){
              that.error=err.name[0];
            }
          })
        }
        else{
          this.$message.error('失败了！');
        }
      })

    }
  }
}
</script>

<style scoped>
  .error-text{
    color:#fa8341;
  }
</style>
