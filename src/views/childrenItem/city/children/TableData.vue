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

      <add-user></add-user>

      <el-table :data="list" stripe style="width: 100%" >
        <el-table-column prop="city_id" label="编号" width="120"></el-table-column>
        <el-table-column label="城市">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.city_name }}</span>
              <i class="el-icon-edit-outline" @click="updatepName(scope.row.city_name, scope.row.city_id)"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="收录资料">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.count }} 份</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="所属省份">
          <template slot-scope="scope">
            <div>
              <span>{{ scope.row.province_name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="更多操作">
          <template slot-scope="scope">
            <el-row>
              <look-dialog :gridData="scope.row.children"></look-dialog>
              <el-button @click="deleteUser(scope.row.city_id)" type="danger" icon="el-icon-delete">删除</el-button>
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
import AddUser from  './AddUser'
import LookDialog from "./LookDialog"
export default {
  name: "TableData",
  components: {
    AddUser,
    LookDialog
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
    deleteUser(id) {
      this.$messageBox('此操作将永久删除该收录信息, 是否继续?', '警告', {
        confirmButtonText: '确定删除',
        cancelButtonText: '取消删除',
        type: 'warning'
      }).then(() => {
        this.$axios({
          url: "?service=Delete.deleteDataById",
          method: "post",
          data: {
            'tableName': 'City',
            'id': id,
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
    updatepName(name, id) {
    this.$prompt('请输入新名称', '', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputErrorMessage: '格式不正确',
      inputValue: name
    }).then(({value}) => {
      this.$axios({
        url: "?service=Update.updateDataInfoById",
        method: "post",
        data: {
          'tableName': 'Province',
          'id': id,
          'fields': 'province_name',
          'value': value
        }
      }).then(({data: {data}}) => {
        if (data.code) {
          this.getList()
          this.$message({
            type: 'success',
            message: '修改成功，新名称为: ' + value
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
          'tableName': 'City',
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
      }
      this.$axios({
        url: "?service=Request.fuzzyQueryData",
        method: "post",
        data: {
          'tableName': 'City',
          'content': this.queryContent,
        }
      }).then(({data: {data}}) => {
        // console.log(data)
        this.list = data.list;
        this.total = Number(data.count)
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