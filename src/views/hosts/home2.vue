<template>
  <div class="components-container" style='height:100vh'>
    <el-card>
      <div class="head-lavel">
        <div class="table-button">
          <!--<el-button type="primary" icon="el-icon-plus" @click="addForm=true">新建</el-button>-->
          <el-button-group>
            <!--<el-button type="primary" plain size="mini" @click="getHostFromSalt('create')" :loading="autocreate">自动获取-->
            <!--</el-button>-->
            <!--<el-button type="success" plain size="mini" @click="getHostFromSalt('update')" :loading="autoupdate">自动更新-->
            <!--</el-button>-->
          </el-button-group>
          <el-radio-group v-model="listQuery.status" @change="changeStatus" style="margin-left: 20px">
            <el-radio label=2>下线</el-radio>
            <el-radio label=1>上线</el-radio>
          </el-radio-group>
        </div>
        <div class="table-search">
          <el-input
            placeholder="主机名或ip"
            v-model="searchdata"
            @keyup.enter.native="searchClick">
            <i class="el-icon-search el-input__icon" slot="suffix" @click="searchClick"></i>
          </el-input>
        </div>
      </div>
      <div>
        <el-table :data='tableData' border style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="table-expand">
                <el-form-item label="主机名" prop="hostname">
                  <span>{{ props.row.hostname}}</span>
                </el-form-item>
                <el-form-item label="系统" prop="os">
                  <span>{{ props.row.os }}</span>
                </el-form-item>
                <el-form-item label="cpu信息" prop="cpu_info">
                  <span>{{ props.row.cpu_info }}</span>
                </el-form-item>
                <el-form-item label="内存信息" prop="memory">
                  <span>{{ props.row.memory }}</span>
                </el-form-item>
                <el-form-item label="磁盘信息" prop="disk">
                  <a v-for="disk in props.row.disk.split('|')" :key="disk.id" style="margin-right: 5px" size="mini">
                    <el-tag size="mini">{{disk.split(' ')[0]}}</el-tag>
                    <span>{{disk.split(' ')[1]}}</span>
                  </a>
                </el-form-item>
                <el-form-item label="备注" prop="desc">
                  <span>{{ props.row.desc }}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column prop='nip' label='内网地址'></el-table-column>
          <el-table-column prop='wip' label='外网地址'></el-table-column>
          <el-table-column prop='idc' label='机房'></el-table-column>
          <el-table-column prop='server_type' label='类型'>
            <template slot-scope="scope">
              <div slot="reference" class="name-wrapper" style="text-align: center">
                <el-tag style="color: #000" :color="ASSET_TYPE[scope.row.asset_type].color">
                  {{ASSET_TYPE[scope.row.asset_type].type}}
                </el-tag>
              </div>
            </template>
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="success" size="small">修改</el-button>
              <el-button @click="deleteGroup(scope.row.id)" type="danger" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="table-footer">

        <div class="table-button">
        </div>
        <div class="table-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-sizes="pagesize"
            :page-size="listQuery.limit"
            :layout="pageformat"
            :total="tabletotal">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <!--<el-dialog :visible.sync="addForm">-->
      <!--<add-obj @formdata="addGroupSubmit"></add-obj>-->
    <!--</el-dialog>-->
    <!--<el-dialog :visible.sync="editForm" @close="closeEditForm">-->
      <!--<edit-obj :rowdata="rowdata" @formdata="editGroupSubmit"></edit-obj>-->
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import {getHosts} from '../../api/api'
  // import { postHost, getHost, putHost, deleteHost } from '@/api/api'
  // import { getSyncRemoteServer } from 'api/salt'
  // import addObj from './components/addhost.vue'
  // import editObj from './components/edithost.vue'
  export default {
    // components: { addObj, editObj },
    data() {
      return {
        tableData: [],
        tabletotal: 0,
        searchdata: '',
        currentPage: 1,
        LIMIT: 10,
        pagesize: [10,20, 50, 100,500],
        pageformat: 'total, prev, pager, next, sizes',
        listQuery: {
          limit: LIMIT,
          offset: '',
          search: '',
          status:1

        },
        pagesize: pagesize,
        pageformat: pageformat,
        addForm: false,
        editForm: false,
        viewForm: false,
        groupName: '',
        rowdata: {},
        ASSET_TYPE: {
         1: { 'type': '物理机', 'color': '#c0dbff' },
         2: { 'type': '虚拟机', 'color': '#19ddff' },
         3: { 'type': '云主机', 'color': '#f06292' },

        },
        ASSET_STATUS: {
          1: { 'status': '上线', 'type': 'primary' },
          2: { 'status': '下线', 'type': 'info' },
        },
        autocreate: false,
        autoupdate: false
      }
    },
    created() {
      this.gethostInfo();
    },
    methods: {
      gethostInfo(){
        getHosts(this.listQuery).then((response)=> {
          this.tableData = response.data.results
          this.tabletotal = response.data.count
        }).catch(function (error) {
          console.log(error);
        });
      },
      // addGroupSubmit(formdata) {
      //   postHost(formdata).then(response => {
      //     this.$message({
      //       message: '恭喜你，添加成功',
      //       type: 'success'
      //     })
      //     this.fetchData()
      //     this.addForm = false
      //   }).catch(error => {
      //     this.$message.error('添加失败')
      //     console.log(error)
      //   })
      // },
      // editGroupSubmit(formdata) {
      //   putHost(this.rowdata.id, formdata).then(response => {
      //     this.$message({
      //       message: '恭喜你，更新成功',
      //       type: 'success'
      //     })
      //     this.fetchData()
      //     this.editForm = false
      //   }).catch(error => {
      //     this.$message.error('更新失败')
      //     console.log(error)
      //   })
      // },
      // deleteGroup(id) {
      //   deleteHost(id).then(response => {
      //     this.$message({
      //       message: '恭喜你，删除成功',
      //       type: 'success'
      //     })
      //     this.fetchData()
      //   }).catch(error => {
      //     this.$message.error('删除失败')
      //     console.log(error)
      //   })
      // },
      // closeEditForm() {
      //   this.fetchData()
      // },
      handleEdit(row) {
        this.editForm = true
        this.rowdata = row
      },
      searchClick() {
        this.listQuery.search = this.searchdata
        this.fetchData()
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.listQuery.offset = (val - 1) * LIMIT
        this.fetchData()
      },
      changeStatus(val) {
        this.listQuery.status = val
        if (val === 'noused') {
          this.havenoused = true
        }
        this.fetchData()
      },
      // getHostFromSalt(val) {
      //   if (val === 'create') {
      //     this.autocreate = true
      //     getSyncRemoteServer(val).then(response => {
      //       this.autocreate = false
      //       this.listQuery.status = 'noused'
      //       this.fetchData()
      //     }).catch(error => {
      //       this.autocreate = false
      //       this.listQuery.status = 'noused'
      //       this.fetchData()
      //       console.log(error)
      //     })
      //   } else {
      //     this.autoupdate = true
      //     getSyncRemoteServer(val).then(response => {
      //       this.autoupdate = false
      //       this.fetchData()
      //     }).catch(error => {
      //       this.autoupdate = false
      //       this.fetchData()
      //       console.log(error)
      //     })
      //   }
      // }
    }
  }
</script>

<style lang='scss'>
</style>
