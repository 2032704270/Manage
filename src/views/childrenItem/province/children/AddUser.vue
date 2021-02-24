<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">收录省份</el-button>

    <el-dialog
        title="省份收录"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-input
          type="text"
          placeholder="请输入省份名"
          v-model="name"
          maxlength="10"
          show-word-limit
          clearable
      ></el-input>


      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addProvince()">添 加</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      dialogVisible: false,
      name: ''
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(() => {
            done();
          })
          .catch(() => {
          });
    },
    addProvince() {
      this.dialogVisible = false
      this.$axios({
        url: '?service=Add.addData',
        method: 'post',
        data: {
          tableName: 'Province',
          data: this.name
        }
      }).then(({data}) => {
        console.log(data)
        if (data.data.code) {
          this.$message({
            type: 'success',
            message: '省份收录成功: ' + this.name
          });
        } else {
          this.$message({
            type: 'success',
            message: '省份收录失败，原因: ' + data.meta.msg
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.cell i {
  color: #367FA9;
  font-weight: 900;
}
div {
  display: inline-block;
}
</style>