<template>
    <div class="table">
      <div class="crumbs">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-cl-hosts">主机管理</i></el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <div class="handle-box">
          <div class="handle-head">
          <el-button type="danger"  round @click="delAll">批量删除</el-button>
          <el-button type="success" round  @click="handleAdd">添加主机</el-button>
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
          </div>
          <el-table
            ref="multipleTable"
            :data='HostsData'
            v-if="HostsData.length>0"
            max-height="500"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            @sort-change="sortChange"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="hostname"
              label="主机名"
              sortable="custom"
              width="200">
            </el-table-column>
            <el-table-column
              prop="wip"
              label="外网地址"
              sortable="custom"
              width="200">
            </el-table-column>
            <el-table-column
              prop="nip"
              label="内网地址"
              sortable="custom"
              width="200">
            </el-table-column>
            <el-table-column
              prop="idc"
              label="机房"
              width="150">
            </el-table-column>
            <el-table-column prop='server_type' label='类型'  width="120" aligin="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper" style="text-align: left">
                  <el-tag style="color: #000" :color="ASSET_TYPE[scope.row.server_type].color">
                    {{ASSET_TYPE[scope.row.server_type].type}}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="os"
              label="系统"
              width="120">
            </el-table-column>
            <el-table-column
              prop="instance_id"
              label="云主机ID"
              width="150">
            </el-table-column>
            <el-table-column prop='status' label='状态' width="120" aligin="center">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper" style="text-align: left">
                  <el-tag :type="ASSET_STATUS[scope.row.status].type">
                    {{ASSET_STATUS[scope.row.status].status}}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop='ctime' label='创建时间'  width="200"  sortable="custom">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper" style="text-align: left; color: rgb(0,0,0)">
                  <span>{{scope.row.ctime | parseDate}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作"  width="180" aligin="center">
              <template slot-scope="scope">
              <el-button type="primary"  @click="handleEdit(scope.row)"   icon="el-icon-edit" circle></el-button>
                <el-button type="danger"  @click="handleDelete(scope.row)"  icon="el-icon-delete" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="listQuery.page"
              :page-sizes="[10, 20, 50,100,500]"
              :page-size="listQuery.page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tabletotal">
            </el-pagination>
          </div>
        </div>
      </div>
      <Hostdialog :dialog="dialog"
                  :rowdata="rowdata"
                  :FormData="FormData"
                  @updatehosts="getHostData">

      </Hostdialog>
    </div>
</template>

<script>
  import Hostdialog from './Hostdialog'
  import { getHosts ,delHost} from '../../api/api'
    export default {
        name: "Hosts",
      created() {
        this.getHostData();

      },
      components:{
          Hostdialog
      },
      data(){
          return{
            FormData:{
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
            dialog:{
              show:false,
              title:'',
              option:'edit',
            },
            rowdata:{},
            searchdata:'',
            tabletotal: 0,
            HostsData: [],
            multipleSelection: [],
            del_list:[],
            listQuery:{
              page:1,
              page_size :10,
              search:'',
              status:'',
              server_type:'',
              ordering:''
            },
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
          getHostData(){
            getHosts(this.listQuery)
              .then(res=>{
                this.HostsData = res.data.results;
                this.tabletotal = res.data.count
              }).catch(function (error) {
                console.log(error)
            })
          },
        sortChange(data) {
          const { prop, order } = data
          if (prop === 'wip') {
            this.sortBywip(order)
          }else if(prop==='nip'){
            this.sortBynip(order)
          }else if(prop==='ctime'){
            this.sortByctime(order)
          }else if(prop==='hostname'){
            this.sortByhostname(order)
          }
        },
        sortBywip(order) {
          if (order === 'ascending') {
            this.listQuery.ordering = 'wip'
          } else {
            this.listQuery.ordering = '-wip'
          }
          this.getHostData()
        },
        sortBynip(order) {
          if (order === 'ascending') {
            this.listQuery.ordering = 'nip'
          } else {
            this.listQuery.ordering = '-nip'
          }
          this.getHostData()
        },
        sortByhostname(order) {
          if (order === 'ascending') {
            this.listQuery.ordering = 'hostname'
          } else {
            this.listQuery.ordering = '-hostname'
          }
          this.getHostData()
        },
        sortByctime(order) {
          if (order === 'ascending') {
            this.listQuery.ordering = 'ctime'
          } else {
            this.listQuery.ordering = '-ctime'
          }
          this.getHostData()
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        //批量删除主机
        delAll(){
          let id_list = [];
          for (let i=0;i<this.multipleSelection.length;i++){
            id_list.push(this.multipleSelection[i].id)
            console.log(id_list)
          }
          for( let i=0;i<id_list.length;i++){
            delHost(id_list[i]).then(response => {
             console.log('删除成功')
              this.getHostData()
            }).catch(error => {
              this.$message.error('删除失败')
              console.log(error)
            })
          }
          this.$message({
            message: '恭喜你，删除成功',
            type: 'success'
          })
          this.multipleSelection=[];

        },

        //删除主机
        handleDelete(row){
          this.$confirm("确定要删除吗？").then(()=>{
            delHost(row.id).then((res)=>{
              this.$message({
                message: '恭喜你，删除成功',
                type: 'success'
              })
              this.getHostData()
            })

          }).catch(error => {
            this.$message.info('点错了')
            console.log(error)
          })
        },

        handleEdit(row){
          this.dialog={
            title:"编辑主机",
            show:true,
            option:'edit',
          },
          this.rowdata=row;
          this.FormData ={
            hostname:row.hostname,
            wip:row.wip,
            nip:row.nip,
            status:row.status,
            server_type:row.server_type,
            sn:row.sn,
            instance_id:row.instance_id,
            idc:row.idc,
            role:row.role,
            business_unit:row.business_unit,
            desc:row.desc,
            cpu_info:row.cpu_info,
            memory:row.memory,
            disk:row.disk,
            os:row.os,
          }
        },
        //添加主机
        handleAdd(){
          this.dialog={
            title:"添加主机",
            show:true,
            option:'add',
          };
        },

        //搜索主机
        searchClick(){
          this.listQuery.search = this.searchdata;
          this.getHostData()
        },
        changeStatus(val){
          this.listQuery.status = val
          this.getHostData()
        },
        changeServerType(val){
          this.listQuery.server_type = val
          this.getHostData()
        },
        handleCurrentChange(val) {
           // this.currentPage =val  //点击多少页
          this.listQuery.page = val
          this.getHostData()
        },
        handleSizeChange(val) {
          this.listQuery.page_size= val  //每页显示多少条
          this.getHostData()
        },
      }
    }
</script>

<style scoped>
  .handle-box {
    margin-bottom: 20px;
  }
  .handle-head {
    padding-bottom: 30px;
  }
  .search {
    float: right;

  }
  .handle-input {
    width: 300px;
    display: inline-block;

  }
</style>
