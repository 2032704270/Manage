<template>
  <span>
    <el-button type="primary" icon="el-icon-edit" @click="queryCityList()">查看城市</el-button>

    <el-dialog title="城市列表" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column property="city_id" label="编号"></el-table-column>
        <el-table-column property="city_name" label="城市"></el-table-column>
        <el-table-column property="province_name" label="所属"></el-table-column>
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