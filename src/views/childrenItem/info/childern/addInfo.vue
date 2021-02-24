<template>
  <div class="addBox">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/info' }">资料管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加资料</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-cards">
      <el-tabs tab-position="top" style="min-height: 450px;">
        <el-tab-pane label="基本内容">
          <el-row :gutter="15">
            <el-col :span="10">
              <el-input placeholder="请输入标题" v-model="inputTitle" clearable></el-input>
            </el-col>
            <el-col :span="5">
              <el-cascader
                v-model="value"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="封面图片">
          <!-- 上传图片 -->
          <input
            type="file"
            name="file"
            @change="imgLocals"
            multiple
            id="imgLocal"
            accept="image/*"
          />
          <div id="boxImg"></div>
          <!-- 上传图片end -->
        </el-tab-pane>
        <el-tab-pane label="资料内容">
          <quill-editor v-model="goods_introduce"></quill-editor>

          <el-button type="primary" @click="addInfo">提交资料</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
// import request from 'axios'
export default {
  name: "addInfo",
  components: {
    quillEditor,
  },
  data() {
    return {
      fileList: [],
      // 内容
      goods_introduce: "",
      // 标题
      inputTitle: '',
      // 级联选中
      value: [],
      // 保存封面图片路径
      imgPage: '',
      // 级联选择器数据
      options: []
    };
  },
  methods: {
    handleChange(value) {
      this.value = value
      console.log(this.value);
    },
    addInfo() {
      this.$axios({
        url: '?service=Add.addData',
        method: 'post',
        data: {
          tableName: 'Information',
          data: this.inputTitle + '-----' + 
          this.goods_introduce + '-----' + 
          this.imgPage + '-----' +
          this.value[1]
        }
      }).then(({data}) => {
        console.log(data)
        if(data.meta.status !== 200) return this.$message.error('添加资料失败')
        this.$message.success('添加资料成功')
        this.$router.push('/info')
      })
    },
    imgLocals() {
      let fileList = document.querySelector("#imgLocal").files;
      let file = fileList[0];
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file); // 读取图片
      fileReader.addEventListener("load", () => {
        // 读取完成
        let res = fileReader.result;

        let img = document.createElement("img");
        img.src = res;
        document.getElementById("boxImg").appendChild(img);

        const formData = new FormData();
        console.log(res);
        formData.append("file", res);

        this.$axios({
          url: "?service=Upload.uploadImage",
          method: "post",
          data: { file: res },
          // config,
        }).then(({data:{data}}) => {
          this.imgPage = data.url
          console.log(this.imgPage);
        });
      });
    },
    getCityList() {
      this.$axios({
        url: '?service=Request.getProvinceAndCity'
      }).then(({data:{data}})=> {
        this.options = data
      })
    }
  },
  created() {
    this.getCityList()
  }
};
</script>
<style lang="less">
.ql-editor {
  min-height: 420px;
  max-height: 420px;
}
.box-cards {
  margin-top: 15px;
}
.quill-editor {
  margin-bottom: 10px;
}
</style>