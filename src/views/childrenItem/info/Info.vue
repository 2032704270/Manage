<template>
  <div>
    <h1>资料信息列表</h1>
    <el-card class="box-card">
      <!-- 搜索框 -->
      <el-row :gutter="15">
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="messageData" clearable @clear="getInfoList">
            <el-button slot="append" icon="el-icon-search" @click="inQuery"></el-button>
          </el-input>
        </el-col>
        <el-col :span="5">
          <el-button type="primary" @click="addInfo">添加资料</el-button>
        </el-col>
      </el-row>
      <!-- 搜索end -->
      <!-- table -->
      <!-- :cell-style="{'text-align':'center'}" -->
      <el-table :data="infoTableData" style="width: 100%" border stripe>
        <!-- <el-table-column type="index" label="编号" width="80px" align="center"></el-table-column> -->
        <el-table-column prop="info_id" label="Id" align="center" width="80px"></el-table-column>
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
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="nextPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="infoQuery.count"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
      <!-- 分页结束 -->
      <!-- <pagination-module :getInfoList="getInfoList"></pagination-module> -->
    </el-card>
  </div>
</template>
<script>
// import PaginationModule from 'components/paginations/PaginationModule'
export default {
  name: "Info",
  components: {
    // PaginationModule
  },
  data() {
    return {
      infoTableData: [],
      infoQuery: {
        tableName: "Information",
        start: 0,
        count: 5,
      },
      // 记录翻页码
      nextPage: 1,
      // // 总数
      total: 0,
      messageData: "",
    };
  },
  methods: {
    getInfoList() {
      this.$axios({
        url: "?service=Request.getTablePageData",
        params: this.infoQuery,
      }).then(({ data: { data } }) => {
        this.total = Number(data.count);
        this.infoTableData = data.list;
      });
    },
    handleSizeChange(newSize) {
      // 选择渲染多少条帖子呗
      this.infoQuery.count = newSize;
      this.getInfoList();
    },
    handleCurrentChange(newPage) {
      // 这个傻逼后端啊，不处理是几页，要我在这里处理分页
      this.nextPage = newPage;
      this.infoQuery.start =
        this.infoQuery.count * newPage - this.infoQuery.count;
      // console.log(this.infoQuery);
      // console.log(this.nextPage);
      this.getInfoList();
    },
    // 查询
    inQuery() {
      if (this.messageData === "") return;
      this.$axios({
        url: "?service=Request.fuzzyQueryData",
        params: {
          tableName: "Information",
          content: this.messageData,
        },
      }).then(({ data: { data } }) => {
        console.log(data);
        this.infoTableData = data;
      });
    },
    deleteUser(info_id) {
      this.$messageBox("是否永久删除这条资料 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
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
};
</script>
<style lang="less" >
h1 {
  margin: 0;
  padding: 0;
}
.box-card {
  margin-top: 15px;
  min-height: 400px;
}
.el-table {
  margin: 15px 0;
}
</style>