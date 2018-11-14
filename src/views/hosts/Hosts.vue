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
          <el-select v-model="listQuery.status"   @change="changeStatus" placeholder="请选择" class="handle-select mr10">
            <el-option label="上线" value="online">
            </el-option>
            <el-option label="下线" value="offline">
            </el-option>
          </el-select>
          <el-select v-model="listQuery.server_type"   @change="changeServerType" placeholder="请选择" class="handle-select mr10">
              <el-option label="物理机"  value="physical"></el-option>
            <el-option label="虚拟机" value="virtual"></el-option>
            <el-option label="云主机" value="instance"></el-option>
          </el-select>

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
            <el-table-column prop='server_type' label='类型'>
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper" style="text-align: center">
                  <el-tag style="color: #000" :color="ASSET_TYPE[scope.row.server_type].color">
                    {{ASSET_TYPE[scope.row.server_type].type}}
                  </el-tag>
                </div>
              </template>
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
            <el-table-column prop='status' label='状态'>
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper" style="text-align: center">
                  <el-tag :type="ASSET_STATUS[scope.row.status].type">
                    {{ASSET_STATUS[scope.row.status].status}}
                  </el-tag>
                </div>
              </template>
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
  import { getHosts } from '../../api/api'
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
              status:'',
              server_type:'',
            },
            // ASSET_TYPE:[
            //   {'type':'physical', 'display': '物理机', 'color': '#c0dbff' },
            //   {'type':'virtual', 'display': '虚拟机', 'color': '#19ddff' },
            //   {'type':'instance', 'display': '云主机', 'color': '#f06292' },
            // ],
            // ASSET_STATUS: [
            //     {'status':'online',  'display': '上线'},
            //     { 'status':'offline',  'display': '下线'},
            // ],
            ASSET_TYPE: {
              'physical': { 'type': '物理机', 'color': '#c0dbff' },
              'virtual': { 'type': '虚拟机', 'color': '#19ddff' },
              'instance': { 'type': '云主机', 'color': '#f06292' },

            },
            ASSET_STATUS: {
              'online': { 'status': '上线', 'type': 'primary' },
              'offline': { 'status': '下线', 'type': 'info' },

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
        changeServerType(val){
          this.listQuery.server_type = val
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
