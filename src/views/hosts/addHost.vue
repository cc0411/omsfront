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
        <el-form ref="hostform" :model="Hostinfo"  :rules="rules" label-width="80px">
          <el-form-item label="主机名" prop="hostname">
            <el-input v-model="Hostinfo.hostname"></el-input>
          </el-form-item>
          <el-form-item label="外网地址" prop="wip">
            <el-input v-model="Hostinfo.wip"></el-input>
          </el-form-item>
          <el-form-item label="内网地址" prop="nip">
            <el-input v-model="Hostinfo.nip"></el-input>
          </el-form-item>
          <el-form-item label="设备类型" prop="server_type">
            <el-select v-model="Hostinfo.server_type" placeholder="请选择设备类型">
              <el-option v-for="item in ASSET_TYPE" :key="item.key" :label="item.name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主机状态" prop="status">
            <el-select v-model="Hostinfo.status" placeholder="请选择主机状态">
              <el-option v-for="item in ASSET_STATUS" :key="item.key" :label="item.name" :value="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="云主机ID" prop="instance_id">
            <el-input v-model="Hostinfo.instance_id"></el-input>
          </el-form-item>
          <el-form-item label="SN编号" prop="sn">
            <el-input v-model="Hostinfo.sn"></el-input>
          </el-form-item>
          <el-form-item label="CPU" prop="cpu_info">
            <el-input v-model="Hostinfo.cpu_info"></el-input>
          </el-form-item>
          <el-form-item label="内存" prop="memory">
            <el-input v-model="Hostinfo.memory"></el-input>
          </el-form-item>
          <el-form-item label="硬盘" prop="disk">
            <el-input v-model="Hostinfo.disk"></el-input>
          </el-form-item>
          <el-form-item label="系统" prop="os">
            <el-input v-model="Hostinfo.os"></el-input>
          </el-form-item>
          <el-form-item label="机房" prop="idc">
            <el-select v-model="Hostinfo.idc" placeholder="请选择机房">
              <el-option v-for="item in IdcData" :key="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-select v-model="Hostinfo.role" multiple placeholder="请选择">
              <el-option  v-for="item in RoleData"  :key="item.name"  :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="业务线" prop="business_unit">
            <el-select v-model="Hostinfo.business_unit" placeholder="请选择业务线">
              <el-option v-for="item in BusinessUnitData" :key="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主机描述" prop="desc">
            <el-input type="textarea" rows="5" v-model="Hostinfo.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <p class="error-text" v-show="error">{{error}}</p>
            <el-button type="primary" @click="onSubmit('hostform')">提交</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
</template>

<script>
import {addHost}  from '../../api/api'
export default {
name: 'addHost',
  computed:{
    BusinessUnitData(){
      return  this.$store.state.businessunitsdata
    },
    IdcData(){
      return  this.$store.state.idcsdata
    },
    RoleData(){
      return  this.$store.state.rolesdata
    },
  },
  data(){
  return{
    Hostinfo:{
      hostname:'',
      wip:'',
      nip:'',
      status:'',
      server_type:'',
      sn:'',
      instance_id:'',
      idc:'',
      role:'',
      business_unit:'',
      desc:'',
      cpu_info:'',
      memory:0,
      disk:0,
      os:'',
    },
    ASSET_STATUS: [
      { key: 'online', name: '上线' },
      { key: 'offline', name: '下线' },
    ],
    ASSET_TYPE: [
      { key: 'physical', name: '物理机' },
      { key: 'virtual', name: '虚拟机' },
      { key: 'instance', name: '云主机' },
    ],
    error:false,
    rules:{
      hostname: [
        { required: true, message: '主机名不能为空', trigger: 'blur' }
      ],

    }
  }
  },
  methods: {
    onSubmit(Formname) {
      var that = this
      this.$refs[Formname].validate((valid) => {
        if (valid) {
          addHost(this.Hostinfo)
            .then(res=>{
              this.$message.success('添加成功！');
              this.$router.push("/hosts")
            }).catch(function (error) {
            const err = error.response.data;
            if("non_field_errors" in err){
              that.error =err.non_field_errors[0];
            }
            if("hostname" in err){
              that.error=err.hostname[0];
            };
            if("wip" in err){
              that.error=err.wip[0];
            };
            if("nip" in err){
              that.error=err.nip[0];
            };
          })
        } else {
          this.$message.error('添加失败')
        }
      })
    },
  }
}
</script>

<style scoped>
  .error-text{
    color:#fa8341;
  }
</style>
