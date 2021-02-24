<template>
  <div>
    <!-- 分页开始 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="nextPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="infoQuery.count"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >></el-pagination>
    <!-- 分页结束 -->
  </div>
</template>
<script>
export default {
  name: "PaginationModule",
  props: {
    infoQuery: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handleSizeChange(newSize) {
      // 选择渲染多少条帖子呗
      this.infoQuery.count = newSize;
      // this.getInfoList();
    },
    handleCurrentChange(newPage) {
      // 这个傻逼后端啊，不处理是几页，要我在这里处理分页
      this.nextPage = newPage;
      this.infoQuery.start =
        this.infoQuery.count * newPage - this.infoQuery.count;
      // console.log(this.infoQuery);
      // console.log(this.nextPage);
      // this.getInfoList();
    },
  },
};
</script>
<style lang="less" scoped>
</style>