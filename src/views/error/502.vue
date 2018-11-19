<template>
    <div class="main">
        <img src="../../assets/images/404.png" alt="">
        <div>SORRY！您没有权限访问本页面!</div>
        <el-button type="primary" @click="goUrl">返回首页</el-button>
    </div>
</template>
<script>
export default {
  methods: {
    goUrl() {
      this.$router.push({
        name: "home"
      });
    // window.history.go(-2)
    }
  }
};
</script>
<style lang="scss" scoped>
.main{
    text-align: center;
    padding-top: 116px;
    box-sizing: border-box;
    img{
        width: 413px;
        height: 347px;
    }
    &>div{
        font-size:18px;
        font-weight:500;
        color:rgba(102,102,102,1);
        line-height:25px;
    }
    &>p{
        height:17px;
        font-size:12px;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:17px;
    }
    & button{
        margin-top: 20px;
    }
}
</style>


