<template>
  <div>
    <h1>城市管理</h1>
    <table-data></table-data>
  </div>
</template>
<script>
import TableData from './children/TableData'
export default {
  name: 'City',
  components: {
    TableData
  }
}
</script>
<style lang="less" scoped>
h1 {
  margin: 0 0 15px 0;
  padding: 0;
  font-size: 26px;
  font-weight: 600;
}
</style>