
<template>
  <el-upload class="avatar-uploader" action="//upload.qiniup.com" :data="qiniu" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon">{{text}}</i>
    </el-upload>

</template>

<script>
import publicApi from "../api/index.js";

export default {
  name: "m-upload",
  props: {
    value: {
      type: String
    },
    text: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      domain: "",
      imageUrl: "",
      qiniu: {
        token: ""
      }
    };
  },
  created() {
    this.getpreupload();
    this.imageUrl = this.value;
  },
  watch: {
    value(newVlaue) {
      this.imageUrl = newVlaue;
    }
  },
  methods: {
    async getpreupload() {
      let { code, data } = await publicApi.preupload();
      if (code == 0) {
        this.qiniu.token = data.uptoken;
        this.domain = data.domain;
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      if (res.key) {
        let url = `${this.domain}${res.key}`;
        this.$emit("input", url);
         // eslint-disable-next-line
        try {
          this.$parent.$parent.$parent.validates();
        } catch (e) {}
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type.includes('image/jpeg')  || file.type.includes('image/png') 
      const isLt2M = file.size / 1024 / 1024 < 3;
      let img = new Image();
      img.onload = function() {};
      img.src = window.URL.createObjectURL(file);
      if (!isJPG) {
        this.$message.error("图片格式错误");
      }
      if (!isLt2M) {
        this.$message.error("单个文件超过3M");
      }
      return isLt2M && isJPG;
    },
    handleAvatarError() {
      this.getpreupload();
      this.$message.error("上传失败");
      this.$emit("input", "");
    }
  }
};
</script>

<style scoped lang='scss'>
.avatar-uploader {
  .el-upload {
    cursor: pointer;
    position: relative;
    overflow: hidden;
    i {
      border-radius: 6px;
      border: 1px dashed #d8d8d8;
    }
  }
}



.avatar-uploader-icon {
  font-size: 14px;
  color: #8c939d;
  width: 90px;
  height: 90px;
  line-height: 90px;
  text-align: center;
}

// 图片大小
.avatar {
  width: 90px;
  height: 90px;
  display: block;
  border-radius: 6px;
}
</style>
