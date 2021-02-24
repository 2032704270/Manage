<template>
  <div class="login">
    <!-- 大盒子 -->
    <div class="login-box">
      <!-- logo区域 -->
      <div class="login-logo">
        <img src="../../assets/logo.png" />
      </div>
      <!-- 登录表单区域 -->
      <login-form></login-form>
    </div>
  </div>
</template>
<script>
import LoginForm from './children/LoginForm'
export default {
  name: "Login",
  components: {
    LoginForm
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  background: #274a6c;
}
.login-box {
  width: 450px;
  height: 300px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  .login-logo {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    border: 1px solid #eee;
    box-shadow: 0 0 10px #eee;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: #eee;
    }
  }
}

</style>