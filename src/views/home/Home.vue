<template>
  <div>
    <el-container class="container">
      <!-- top -->
      <el-header>
        <span>SafetySystem</span>
        <div>
          <i class="el-icon-user-solid"></i>
          <span>{{$store.state.uName}}</span>
          <div class="end" @click="endLogin">退出</div>
        </div>
      </el-header>
      <!-- body -->
      <el-container>
        <!-- left -->
        <el-aside width="200px">
          <!-- 管理员信息-头像 -->
          <div class="userMessage">
            <i class="iconfont icon-gexingtouxiang"></i>
            <div>
              <span>{{$store.state.uName}}</span>
              <span>超级管理员</span>
            </div>
          </div>
          <div class="panel">管理面板</div>
          <el-menu
            background-color="#F9FAFC"
            text-color="#000"
            active-text-color="#369BFF"
            unique-opened
            router
            :default-active="$store.state.activePath">
            <el-menu-item v-for="item in menuList" :key="item.menu_path" :index="'/'+item.menu_path"
            @click="activeClick('/'+item.menu_path)">
              <i :class="item.menu_icon"></i> 
              {{item.menu_name}}
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- right -->
        <el-container>
          <el-main>
            <!-- children -->
            <keep-alive>
              <router-view></router-view>
            </keep-alive>
          </el-main>
          <!-- footer -->
          <el-footer>
            <div>
              Copyright © 2020
              <span>Safety System</span>. All rights reserved.
            </div>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import Echarts from "components/echarts/Echarts";
// import Board from 'components/Board/Board'
export default {
  name: "Home",
  components: {
    // Echarts,
    // Board
  },
  data() {
    return {
      uName: '',
      menuList: [],
      // 记录点击的路径
      activePath: ''
    }
  },
  methods: {
    endLogin() {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("activePath");
      sessionStorage.removeItem("uName");
      this.$router.push("/login");
    },
    getMenuList() {
      // 获取菜单列表
      this.$axios({
        url: '?service=Request.geTabletData',
        params: {
          tableName: 'MenuItem'
        }
      }).then(({data:{data}}) => {
        this.menuList = data.list
      })
    },
    activeClick(activePath) {
      this.$store.commit('getPath', activePath)
      // sessionStorage.setItem('activePath', activePath)
      // this.activePath = activePath
    }
  },
  created() {
    this.getMenuList()
    //this.activePath = sessionStorage.getItem('activePath')
    this.$store.commit('getTokName')
    if(!sessionStorage.getItem('uName')) {
      this.endLogin()
    }
  }
};
</script>
<style lang="less" >
@import url("../../assets/font_icon/iconfont");
.container {
  height: 100%;
  box-sizing: border-box;
}
.el-header {
  background: #00a65a;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  > span {
    font-size: 27px;
    color: #fff;
  }
  > div {
    height: 100%;
    line-height: 60px;
    position: relative;
    cursor: pointer;
    color: #fff;
    i {
      font-size: 18px;
    }
  }
  > div:hover > .end {
    display: block;
  }
}
.end {
  width: 80px;
  height: 40px;
  background-color: #00a65a;
  position: absolute;
  top: 55px;
  text-align: center;
  line-height: 40px;
  display: none;
}
.end:hover {
  color: red;
}

.el-aside {
  background: #f9fafc;
  .el-menu {
    border: none;
  }
}
.el-menu {
  font-weight: 900;
}
.el-main {
  background: #ecf0f5;
  // min-height: 80vh;
}
.userMessage {
  width: 100%;
  padding: 10px 20px 0;
  box-sizing: border-box;
  display: flex;
  i {
    font-size: 50px;
  }
  div {
    margin-top: 8px;
    line-height: 20px;
    padding-left: 10px;
    span {
      display: block;
      font-weight: 700;
    }
    span:nth-of-type(1) {
      font-size: 12px;
      color: #3C8DBC;
    }
    span:nth-of-type(2) {
      font-size: 14px;
    }
  }
}
.panel {
  font-size: 12px;
  padding: 15px 22px;
  color: #848484;
}
.el-footer {
  padding: 0;
  background-color: #fff;
  div {
    line-height: 60px;
    border-top: 1px solid #ccc;
    font-size: 14px;
    padding: 0 15px;
    text-align: center;
    span {
      font-size: 18px;
      font-weight: 700;
      color: #3c8dbc;
    }
  }
}
</style>