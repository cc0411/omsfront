<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item><i class="el-icon-cl-idc">机房管理</i></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">

        <el-button type="success" round  @click="handleAdd">添加机房</el-button>
        <el-table
          :data='TableData'
          v-if="TableData.length>0"
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
              <el-button type="primary"  @click="handleEdit(scope.row)"  icon="el-icon-edit" circle></el-button>
              <el-button type="danger"  @click="handleDelete(scope.row)"  icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <Idcdialog :dialog="dialog"
                :rowdata="rowdata"
                :FormData="FormData"
                @updateidcs="getIdcData">

    </Idcdialog>
  </div>
</template>

<script>
import Idcdialog  from './Idcdialog'
  import { getIdcs,deleteIdc} from '../../api/api'
    export default {
        name: "Idcs",
      created() {
        this.getIdcData();
      },
      components:{
        Idcdialog
      },
      data(){
        return{
          TableData: [],
          dialog:{
            show:false,
            title:'',
            option:'edit',
          },
          FormData:{
            name:'',
            desc:''
          },
          rowdata:{},
        }
      },
      methods:{
        //获取机房信息
        getIdcData(){
          getIdcs()
            .then(res=>{
              console.log(res)
              this.TableData = res.data;
              this.$store.commit("IDC",res.data)


            }).catch(function (error) {
            console.log(error)
          })
        },
        //删除机房
        handleDelete(row){
          this.$confirm("确定要删除吗？").then(()=>{
            deleteIdc(row.id).then((res)=>{
              this.$message({
                message: '恭喜你，删除成功',
                type: 'success'
              })
              this.getIdcData()
            })

          }).catch(error => {
            this.$message.info('点错了')
            console.log(error)
          })
        },
        //编辑机房
        handleEdit(row){
          this.dialog={
            title:"编辑机房",
            show:true,
            option:'edit',
          };
          this.rowdata=row;
          this.FormData ={
            name:row.name,
            desc:row.desc
          }
        },
        //添加机房
        handleAdd(){
          this.dialog={
            title:"添加机房",
            show:true,
            option:'add',
          };
        }



      }
    }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }

</style>
