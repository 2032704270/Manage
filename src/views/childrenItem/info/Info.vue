<template>
  <div>
    <h1>资料信息列表</h1>
    <table-data/>
  </div>
</template>
<script>
import TableData from "./childern/TableData";

export default {
  name: "Info",
  components: {
    TableData
  },
};
</script>
<style lang="less" >
h1 {
  margin: 0 0 15px 0;
  padding: 0;
  font-size: 26px;
  font-weight: 600;
}
.box-card {
  margin-top: 15px;
  min-height: 400px;
}
.el-table {
  margin: 15px 0;
}
</style>