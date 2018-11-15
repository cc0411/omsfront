<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-cl-idc">机房管理</i></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-button type="success" round  >添加机房</el-button>
        <el-table
          :data='IdcData'
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="机房名"
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
            label="机房描述"
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
  import { getIdcs,deleteIdc} from '../../api/api'
    export default {
        name: "Idcs",
      created() {
        this.getIdcInfo();
      },
      data(){
        return{
          IdcData: [],
        }
      },
      methods:{
        //  获取机房信息
        getIdcInfo(){
          getIdcs()
            .then(res=>{
              console.log(res)
              this.IdcData = res.data;

            }).catch(function (error) {
            console.log(error)
          })
        },
        //删除机房
        handlleDelete(id) {
          deleteIdc(id).then(response => {
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
  .handle-box {
    margin-bottom: 20px;
  }

</style>
