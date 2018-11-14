<template>
    <div class="table">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-cl-shebeiguanli">主机管理</i></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <div class="handle-box">
          <el-button type="danger"  round @click="delAll">批量删除</el-button>
          <el-button type="success" round  @click="AddHost">添加主机</el-button>
          <el-radio-group v-model="listQuery.status"   @change="changeStatus"  class="handle-select mr10">
            <el-radio  label="online"  >上线</el-radio>
            <el-radio  label="offline" >下线</el-radio>
          </el-radio-group>
          <div class="search">
            <el-input v-model="searchdata" placeholder="搜索关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="searchClick">搜索</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data='tableData'
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="hostname"
              label="主机名"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              prop="wip"
              label="外网地址"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              prop="nip"
              label="内网地址"
              sortable
              width="200">
            </el-table-column>
            <el-table-column
              prop="idc"
              label="机房"
              width="150">
            </el-table-column>
            <el-table-column
              prop="server_type"
              label="服务器类型"
              width="150">
            </el-table-column>
            <el-table-column
              prop="os"
              label="系统"
              width="150">
            </el-table-column>
            <el-table-column
              prop="instance_id"
              label="云主机ID"
              sortable
              width="150">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
              sortable
              width="120">
            </el-table-column>
            <el-table-column
              prop ="ctime"
              label="创建时间"
              sortable
              width="180">
              <template slot-scope="scope"></template>
            </el-table-column>
            <el-table-column label="操作"  width="180" aligin="center">
              <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle></el-button>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :page-sizes="[10, 20, 50, 100,300]"
              layout="total,sizes, prev, pager, next"
              :total="tabletotal">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import {getHosts} from '../../api/api'
    export default {
        name: "Hosts",
      created() {
        this.gethostInfo();

      },
      data(){
          return{
            searchdata:'',
            tabletotal: 0,
            tableData: [],
            currentPage: 1,
            pagesize: [10,20, 50, 100,500],
            page:10,
            multipleSelection: [],
            del_list:[],
            listQuery:{
              page:this.page,
              page_size :'',
              search:'',
              status:'online'
            },
            ASSET_TYPE:{
              'physical': { 'type': '物理机', 'color': '#c0dbff' },
              'virtual': { 'type': '虚拟机', 'color': '#19ddff' },
              'instance': { 'type': '云主机', 'color': '#f06292' },
            },
            ASSET_STATUS: {
              'online': { 'status': '上线', 'type': 'primary' },
              'offline': { 'status': '下线', 'type': 'error' },
            },



          }
      },

      methods:{
        //  获取主机信息
          gethostInfo(){
            getHosts(this.listQuery)
              .then(res=>{
                this.tableData = res.data.results;
                this.tabletotal = res.data.count
              }).catch(function (error) {
                console.log(error)
            })
          },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
          //批量删除主机
          delAll(){


          },
        //添加主机
        AddHost(){

        },
        //搜索主机
        searchClick(){
          this.listQuery.search = this.searchdata;
          this.gethostInfo()
        },
        changeStatus(val){
          this.listQuery.status = val
          this.gethostInfo()
        },
        handleCurrentChange(val) {
          this.page =val
          this.gethostInfo()
        }
      }
    }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }
  .search {
    float: right;
  }
  .handle-input {
    width: 300px;
    display: inline-block;

  }
</style>
