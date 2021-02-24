<template>
  <div class="box" :style="{'background-color': data.bgcolor}">
    <h1 class="count">{{data.count}}</h1>
    <p class="msg">{{data.msg}}</p>
    <div class="icon" :style="{'background-image': 'url(' + data.bg + ')'}"></div>
    <div class="bottom">
      <span @click="btnClick">{{data.hmsg}}</span>
      <i class="el-icon-right i-border"></i>
    </div>
  </div>
</template>

<script>

export default {
  name: "SmallBox",
  props: {
    data: {
      type: Object,
      required: true,
      default() {
        return {
          count: 0,
          msg: "加载中",
          hmsg: "加载中",
          bgcolor: "white",
          bg: "",
          paths: "/user",
        };
      },
    },
  },
  methods: {
    btnClick() {
      this.$store.commit("getPath", this.data.paths);
      this.$router.push(this.data.paths);
    },
  }
};
</script>

<style scoped>
h1,
p {
  margin: 0;
  padding: 9px 0 0 9px;
  font-size: 32px;
  color: white;
}
.msg,
.bottom {
  font-size: 14px;
}
.box {
  width: 250px;
  height: 140px;
  margin: 15px;
  display: inline-block;
  opacity: 0.9;
  position: relative;
}
.icon {
  width: 70px;
  height: 70px;
  position: absolute;
  right: 30px;
  top: 30px;
  background-size: 100% 100%;
  transition: 500ms;
}
.box:hover .icon {
  transform: scale(1.15);
}
.box:hover .bottom {
  color: white;
  font-weight: 900;
}
.bottom {
  width: 100%;
  height: 24px;
  line-height: 24px;
  background-color: rgba(0, 0, 0, 0.3);
  text-align: center;
  position: absolute;
  bottom: 0;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}
</style>