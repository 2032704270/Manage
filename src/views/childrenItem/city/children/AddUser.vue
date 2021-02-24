<template>
  <div>
    <el-button type="primary" @click="dialogVisible = true">收录城市</el-button>

    <el-dialog
        title="城市收录"
        :visible.sync="dialogVisible"
        width="20%"
        :before-close="handleClose">
      <el-select v-model="value" placeholder="请选择所属省份">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        ></el-option>
      </el-select>
      <el-input
          type="text"
          placeholder="请输入城市名"
          v-model="name"
          maxlength="15"
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
      name: '',
      value: '',
      options: []
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
          tableName: 'City',
          data: this.name + '-----' + this.value
        }
      }).then(({data: {data}}) => {
        // console.log(data)
        if (data.code) {
          this.$message({
            type: 'success',
            message: '城市收录成功: ' + this.name
          });
        } else {
          this.$message({
            type: 'success',
            message: '城市收录失败，原因: ' + data.meta.msg
          });
        }
      });
    }
  },
  created() {
    this.$axios({
      url: '?service=Request.getProvinceAndCity',
      method: 'post',
    }).then(({data: {data}}) => {
      // console.log(data)
      this.options = data
    });
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