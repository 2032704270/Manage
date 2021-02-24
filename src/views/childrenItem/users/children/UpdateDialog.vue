<template>
  <span>
    <i class="el-icon-edit-outline" @click="dialogVisible = true"></i>
    <el-dialog
        title="权限操作"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <span>请选择新的权限&nbsp;&nbsp;</span>
      <el-select v-model="userdata.admin" placeholder="请选择">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="updateAdmin()">确 定</el-button>
    </span>
    </el-dialog>
  </span>
</template>

<script>
export default {
  name: "UpdateDialog",
  props: {
    userdata: {
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      options: [{
        value: '0',
        label: '普通用户'
      }, {
        value: '1',
        label: '超级管理员'
      }, {
        value: '2',
        label: '封禁'
      }],
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
    updateAdmin() {
      this.dialogVisible = false
      this.$axios({
        url: '?service=Update.updateDataInfoById',
        method: 'post',
        data: {
          tableName: 'User',
          id: this.userdata.uId,
          fields: 'admin',
          value: this.userdata.admin
        }
      }).then(({data}) => {
        // console.log(data)
        if (data.data.code) {
          this.$message({
            type: 'success',
            message: '权限修改成功...'
          });
        } else {
          this.$message({
            type: 'success',
            message: '权限修改失败，原因: ' + data.meta.msg
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
</style>