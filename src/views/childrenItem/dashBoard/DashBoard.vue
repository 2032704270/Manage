<template>
  <div>
    <h1>仪盘表</h1>
    <el-card class="box_card">
      <el-row>
        <small-box v-for="(item, index) in dataList" :key="index" :data="item"></small-box>

      </el-row>
      <!-- 内容 -->
      <el-row :gutter="20">
        <!-- 左边 -->
        <el-col :span="12">
          <el-card>
            <el-row>
<!--              <small-box v-for="(item, index) in dataList" :key="index" :data="item"></small-box>-->

              <echarts :wh="{width: 600, height: 500}"></echarts>
            </el-row>
          </el-card>
        </el-col>
        <!-- 右边 -->
        <el-col :span="12">
          <!-- 内容 -->
          <el-card>
            <el-row>
              <!-- <echarts :wh="{width: 600, height: 500}"></echarts> -->
              <big-datas></big-datas>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
import SmallBox from "./children/SmallBox";
import Echarts from "../../../components/echarts/Echarts";
import BigDatas from "../../../components/bigDatas/BigDatas"
export default {
  name: "DashBoard",
  components: {
    SmallBox,
    Echarts,
    BigDatas
  },
  data() {
    return {
      dataList: {},
    };
  },
  created() {
    this.getBoard();
  },
  methods: {
    async getBoard() {
      this.$axios({
        url: "?service=Request.getDataCount",
        method: "post",
      }).then(({ data: { data } }) => {
        console.log(data)
        this.dataList = data;
        this.dataList.user.hmsg = "用户管理";
        this.dataList.user.bgcolor = "#00c0ef";
        this.dataList.user.bg = require("../../../assets/images/homePhoto/home-user.png");
        this.dataList.user.paths = "/users";

        this.dataList.information.hmsg = "资料管理";
        this.dataList.information.bgcolor = "#00A65A";
        this.dataList.information.bg = require("../../../assets/images/homePhoto/home-info.png");
        this.dataList.information.paths = "/info";

        this.dataList.city.hmsg = "城市管理";
        this.dataList.city.bgcolor = "#605CA8";
        this.dataList.city.bg = require("../../../assets/images/homePhoto/home-city.png");
        this.dataList.city.paths = "/city";

        this.dataList.province.hmsg = "省份管理";
        this.dataList.province.bgcolor = "#F39C12";
        this.dataList.province.bg = require("../../../assets/images/homePhoto/home-province.png");
        this.dataList.province.paths = "/province";
        // console.log(this.dataList);
      });
    },
  },
};
</script>
<style lang="less" scoped>
h1 {
  margin: 0;
  padding: 0;
}
.box_card {
  margin-top: 15px;
}
</style>