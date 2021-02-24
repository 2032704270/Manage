<template>
  <div>
    <el-form ref="refForm" :rules="rules" :model="form" class="login-form">
      <!-- 账号区域 -->
      <el-form-item prop="name">
        <el-input placeholder="请输入账号..." v-model="form.name" prefix-icon="iconfont icon-user">
          <template slot="prepend">
            <i class="el-icon-s-custom"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码区域 -->
      <el-form-item prop="pass">
        <el-input
          placeholder="请输入密码..."
          v-model="form.pass"
          type="password"
          prefix-icon="iconfont icon-3702mima"
        >
          <template slot="prepend">
            <i class="el-icon-view"></i>
          </template>
        </el-input>
      </el-form-item>
      <!-- 按钮区域 -->
      <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        name: "",
        pass: "",
      },
      rules: {
        name: [
          { required: true, message: "请输用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        pass: [
          { required: true, message: "请输用户密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    // 重置表单
    resetForm() {
      this.$refs.refForm.resetFields();
    },
    // 登录
    login() {
      this.$refs.refForm.validate((inf) => {
        if (!inf) return;
        this.$axios({
          url: "?s=User.userLogin",
          method: "post",
          data: this.form,
        }).then(({ data: { data } }) => {
          if (data.code !== 0) return this.$message.error({message: data.msg, center: true});
          if (data.admin === "0") return this.$message.error({message: "您不是管理员", center: true});
          if (data.admin === "1") {
            this.$store.commit("getTokName", {token: data.token, uName: data.uName});
            // this.$store.commit("getTokName", data.token);
            // this.$store.commit('getuName', data.uName)
            this.$store.commit('getPath', '/dashBoard')
            // sessionStorage.setItem('activePath', '/dashBoard')
            this.$message.success({ message: "登录成功！", center: true });
            this.$router.push("/home");
          }
          if (data.admin === "2") return this.$message.error({ message: "该账号被禁用", center: true });
        });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login-form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 25px;
  box-sizing: border-box;
  .btns {
    display: flex;
    justify-content: center;
  }
}
</style>