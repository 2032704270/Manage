<template>
  <span>
    <el-button type="primary" icon="el-icon-edit" @click="queryCityList()">查看资料</el-button>

    <el-dialog title="资料列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="info_id" label="编号" width="80"></el-table-column>
        <el-table-column property="info_title" label="标题"></el-table-column>
        <el-table-column property="createTime" label="创建时间" width="180"></el-table-column>
        <el-table-column property="city_name" label="所属区域" width="140"></el-table-column>
      </el-table>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: "LookDialog",
  props: {
    gridData: {
      required: true
    }
  },
  data() {
    return {
      dialogTableVisible: false,
    }
  },
  methods: {
    queryCityList() {
      this.dialogTableVisible = true
    },
  },
}
</script>

<style>
.cell i {
  color: #367FA9;
  font-weight: 900;
}
.el-table {
  height: 400px;
  overflow: auto;
}
</style>