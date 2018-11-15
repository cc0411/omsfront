<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-cl-profile">业务线管理</i></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="success" round @click="addBusinessUnit" >添加业务线</el-button>
        <el-table
          :data='BusinessUnitData'
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="parent_unit"
            label="父业务线名"
            width="200">
          </el-table-column>
          <el-table-column
            prop="name"
            label="业务线名"
            width="200">
          </el-table-column>
          <el-table-column prop='ctime' label='创建时间'  width="200">
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper" style="text-align: left; color: rgb(0,0,0)">
                <span>{{scope.row.ctime | parseDate}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="desc"
            label="业务线描述"
            width="300">
          </el-table-column>
          <el-table-column label="操作"  width="180" aligin="center">
            <template slot-scope="scope">
              <el-button type="primary"    icon="el-icon-edit" circle></el-button>
              <el-button type="danger"  @click="handleDelete(scope.row)"  icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {getBusinessUnits,deleteBusinessUnit}  from '../../api/api'
export default {
name: 'BusinessUnit',
data(){
  return {
    BusinessUnitData:[],
  }
},
  created(){
  this.getBusinessUnitsInfo()

  },
  methods:{
    //  获取机房信息
    getBusinessUnitsInfo(){
      getBusinessUnits()
        .then(res=>{
          console.log(res)
          this.BusinessUnitData = res.data;

        }).catch(function (error) {
        console.log(error)
      })
    },
    //删除业务线
    handleDelete(row){
      this.$confirm("确定要删除吗？").then(()=>{
        deleteBusinessUnit(row.id).then((res)=>{
          this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          })
          this.getBusinessUnitsInfo()
        })

      }).catch(error => {
        this.$message.info('点错了')
        console.log(error)
      })
    },

    addBusinessUnit(){
      this.$router.push('/business/add')
    }
  }

}
</script>

<style scoped>

</style>
