<template>
    <el-container class="container">
        <mHeader />
         <router-view class="router"></router-view>
         <mFooter />
    </el-container>

</template>
<script>
import mHeader from "./m-header";
import mFooter from "./m-footer";

export default {
  components: {
    mHeader,
    mFooter
  }
};
</script>
<style scoped lang='scss'>
@import "../assets/css/var.scss";
.container {
  height: 100vh;
  display: block;
  .router{
     min-height: calc(100% - 130px);
  }
}
</style>
