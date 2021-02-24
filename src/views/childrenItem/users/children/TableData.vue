<template>
  <div>
    <el-card class="box-card">

      <div class="searchInput">
        <el-input placeholder="请输入内容"
                  v-model="queryContent"
                  @change="fuzzyQueryData()"
                  @input="fuzzyQueryData()"
                  clearable>
          <el-button slot="append" icon="el-icon-search" @click="fuzzyQueryData()"></el-button>
        </el-input>
      </div>

      <add-user :total="total" :list="list" @refreshList="refreshList"></add-user>

      <el-table :data="list" stripe style="width: 100%">
        <el-table-column prop="uId" label="编号" width="80"></el-table-column>
        <el-table-column prop="uEmail" label="邮箱">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.uEmail }}</span>
              <i class="el-icon-edit-outline" @click="updateEmail(scope.row.uEmail, scope.row.uId)"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="uName" label="昵称">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.uName }}</span>
              <i class="el-icon-edit-outline" @click="updateName(scope.row.uName, scope.row.uId)"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="admin" label="权限" width="180">
          <template slot-scope="scope">
            <div v-if="scope.row.admin === '1'">
              <span>超级管理员</span>
              <update-dialog :userdata="scope.row"></update-dialog>
            </div>
            <div v-else-if="scope.row.admin === '0'">
              <span>普通用户</span>
              <update-dialog :userdata="scope.row"></update-dialog>
            </div>
            <div v-else>
              <span>封禁</span>
              <update-dialog :userdata="scope.row"></update-dialog>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="loginTime" label="登录时间"></el-table-column>
        <el-table-column prop="uId" label="更多操作">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary"
                         icon="el-icon-edit"
                         @click="updatePassword(scope.row.uPassword, scope.row.uId)">修改密码</el-button>
              <el-button @click="deleteUser(scope.row.uId)" type="danger" icon="el-icon-delete">删除</el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="pageSizes"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import UpdateDialog from './UpdateDialog'
import AddUser from  './AddUser'

export default {
  name: "TableData",
  components: {
    UpdateDialog,
    AddUser
  },
  data() {
    return {
      list: [],
      pageSizes: [5, 10, 15, 20],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      queryContent: '',
    }
  },
  methods: {
    deleteUser(uId) {
      this.$messageBox('此操作将永久删除该账号, 是否继续?', '警告', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消删除',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: "?service=Delete.deleteDataById",
          method: "post",
          data: {
            'tableName': 'User',
            'id': uId,
          }
        }).then(({data: {data}}) => {
          if (data.code) {
            this.getList()
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          } else {
            this.$message({
              type: 'success',
              message: '删除失败，原因: ' + data.msg
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    updateEmail(uEmail, uId) {
      this.$prompt('请输入新邮箱', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: '邮箱格式不正确',
        inputValue: uEmail
      }).then(({value}) => {
        this.$axios({
          url: "?service=Update.updateDataInfoById",
          method: "post",
          data: {
            'tableName': 'User',
            'id': uId,
            'fields': 'uEmail',
            'value': value
          }
        }).then(({data: {data}}) => {
          if (data.code) {
            this.getList()
            this.$message({
              type: 'success',
              message: '修改成功，新邮箱为: ' + value
            });
          } else {
            this.$message({
              type: 'success',
              message: '修改失败，原因: ' + data.msg
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },
    updateName(uName, uId) {
      this.$prompt('请输入新昵称', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputErrorMessage: '格式不正确',
        inputValue: uName
      }).then(({value}) => {
        this.$axios({
          url: "?service=Update.updateDataInfoById",
          method: "post",
          data: {
            'tableName': 'User',
            'id': uId,
            'fields': 'uName',
            'value': value
          }
        }).then(({data: {data}}) => {
          if (data.code) {
            this.getList()
            this.$message({
              type: 'success',
              message: '修改成功，新昵称为: ' + value
            });
          } else {
            this.$message({
              type: 'success',
              message: '修改失败，原因: ' + data.msg
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },
    updatePassword(uPassword, uId) {
      this.$prompt('请输入新密码', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: uPassword
      }).then(({value}) => {
        this.$axios({
          url: "?service=Update.updateDataInfoById",
          method: "post",
          data: {
            'tableName': 'User',
            'id': uId,
            'fields': 'uPassword',
            'value': value
          }
        }).then(({data: {data}}) => {
          if (data.code) {
            this.getList()
            this.$message({
              type: 'success',
              message: '修改成功，新密码为: ' + value
            });
          } else {
            this.$message({
              type: 'success',
              message: '修改失败，原因: ' + data.msg
            });
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getList()
    },
    getList() {
      this.$axios({
        url: "?service=Request.getTablePageData",
        method: "post",
        data: {
          'tableName': 'User',
          'start': this.pageSize * (this.currentPage - 1),
          'count': this.pageSize,
        }
      }).then(({data: {data}}) => {
        // console.log(data)
        this.list = data.list;
        this.total = Number(data.count);
      });
    },
    fuzzyQueryData() {
      if (this.queryContent === "" || this.queryContent === null) {
        this.getList()
        return
      }
      this.$axios({
        url: "?service=Request.fuzzyQueryData",
        method: "post",
        data: {
          'tableName': 'User',
          'content': this.queryContent,
        }
      }).then(({data: {data}}) => {
        // console.log(data)
        this.list = data;
        this.total = Number(data.length)
      });
    },
    refreshList(data) {
      if (data) {
        this.getList()
      }
    }
  },
  created() {
    this.getList()
  }
}
</script>

<style scoped>
.cell i {
  color: #367FA9;
  font-weight: 900;
}

.box-card {
  width: 100%;
}

.searchInput {
  margin: 15px 30px 15px 0;
  width: 500px;
  display: inline-block;
}
</style>