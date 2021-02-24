<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible=true">添加用户</el-button>

    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户密码" :label-width="formLabelWidth">
          <el-input v-model="form.pass" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="用户权限" :label-width="formLabelWidth">
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
              v-for="item in form.options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddUser",
  data() {
    return {
      dialogFormVisible: false,
      list: [],
      form: {
        name: '',
        email: '',
        pass: '',
        value: '',
        options: [{
          value: '0',
          label: '普通用户'
        }, {
          value: '1',
          label: '管理员'
        }, {
          value: '2',
          label: '封禁'
        }]
      },
      formLabelWidth: '125px'
    }
  },
  methods: {
    addUser() {
      if (this.name === null || this.email === null || this.pass === null || this.value === null) {
        this.$message({
          type: 'success',
          message: '输入框内容不能准为空'
        });
        return
      } else {
        this.$axios({
          url: "?service=Add.addData",
          method: "post",
          data: {
            tableName: 'User',
            data: this.form.name + "-----" + this.form.pass + "-----" + this.form.email + "-----" + this.form.value
          }
        }).then(({data: {data}}) => {
          // console.log(data)
          this.list.push(data.code)
          this.$emit("refreshList", true);
          this.$message({
            type: 'success',
            message: '用户添加成功!'
          });
        });
      }

      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
div {
  display: inline-block;
}
</style>