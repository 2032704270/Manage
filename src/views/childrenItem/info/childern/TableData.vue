<template>
  <div>
    <el-card class="box-card">
      <!-- 搜索框 -->
      <div class="searchInput">
        <el-input placeholder="请输入内容" v-model="queryContent" clearable @clear="getInfoList">
          <el-button slot="append" icon="el-icon-search" @click="fuzzyQueryData"></el-button>
        </el-input>
      </div>
      <el-button type="primary" @click="addInfo">添加资料</el-button>
      <!-- 搜索end -->
      <!-- table -->
      <el-table :data="list" style="width: 100%" stripe>
        <el-table-column prop="info_id" label="编号" align="center" width="80px"></el-table-column>
        <el-table-column prop="info_title" label="标题" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" @click="editInfo(scope.row.info_id)">修改</el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="deleteUser(scope.row.info_id)"
              >删除</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- table end-->
      <!-- 分页开始 -->
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
      <!-- 分页结束 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "TableData",
  data() {
    return {
      list: [],
      pageSizes: [5, 10, 15, 20],
      total: 0,
      currentPage: 1,
      pageSize: 5,
      queryContent: '',
    };
  },
  methods: {
    getInfoList() {
      this.$axios({
        url: "?service=Request.getTablePageData",
        method: "post",
        data: {
          'tableName': 'Information',
          'start': this.pageSize * (this.currentPage - 1),
          'count': this.pageSize,
        }
      }).then(({ data: { data } }) => {
        this.total = Number(data.count);
        this.list = data.list;
      });
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.getInfoList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.getInfoList()
    },
    // 查询
    fuzzyQueryData() {
      if (this.queryContent === "" || this.queryContent === null) {
        this.getList()
        return
      }
      this.$axios({
        url: "?service=Request.fuzzyQueryData",
        params: {
          tableName: "Information",
          content: this.queryContent,
        },
      }).then(({ data: { data } }) => {
        // console.log(data);
        this.list = data;
        this.total = Number(data.length)
      });
    },
    deleteUser(info_id) {
      this.$messageBox("是否永久删除这条资料 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          this.$axios({
            url: "?service=Delete.deleteDataById",
            params: {
              tableName: "Information",
              id: info_id,
            },
          }).then(({ data: { data } }) => {
            if (data.code !== true)
              return this.$message.error({ message: data.msg, center: true });
            this.$message.success({ message: data.msg, center: true });
            this.getInfoList();
          });
        })
        .catch(() => {
          this.$message.info({ message: "已取消", center: true });
        });
    },
    editInfo(info_id) {
      sessionStorage.setItem('infoId', info_id)
      this.$router.push('/editInfo')
    },
    addInfo() {
      this.$router.push("/addinfo");
    },
  },
  created() {
    this.getInfoList();
  }
}
</script>

<style scoped>
.searchInput {
  margin: 15px 30px 15px 0;
  width: 500px;
  display: inline-block;
}
</style>