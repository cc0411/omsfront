<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-cl-profile">角色管理</i></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="success" round  >添加角色</el-button>
        <el-table
          :data='RoleData'
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="角色名"
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
            label="角色描述"
            width="300">
          </el-table-column>
          <el-table-column label="操作"  width="180" aligin="center">
            <template slot-scope="scope">
              <el-button type="primary"    icon="el-icon-edit" circle></el-button>
              <el-button type="danger"  @click="handlleDelete(scope.row.pk)"  icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
  import { getIRoles,deleteRole} from '../../api/api'
    export default {
        name: "Roles",
      created() {
        this.getIRolenfo();
      },
      data(){
        return{
          RoleData: [],
        }
      },
      methods:{
        //  获取机房信息
        getRoleInfo(){
          getIRoles()
            .then(res=>{
              console.log(res)
              this.RoleData = res.data;

            }).catch(function (error) {
            console.log(error)
          })
        },
        //删除机房
        handlleDelete(id) {
          deleteRole(id).then(response => {
            this.$message({
              message: '恭喜你，删除成功',
              type: 'success'
            })
            this.getIdcInfo()
          }).catch(error => {
            this.$message.error('删除失败')
            console.log(error)
          })
        },
      }
    }
</script>

<style scoped>

</style>
