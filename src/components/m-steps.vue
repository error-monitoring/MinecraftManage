<template>
    <div class="steps">
        <div class="steps-item " v-for="(item,index) in stepsData" :key="index" :class="{active:steps >= index}">
          {{item}}
          <span>{{index + 1}}</span>
        </div>
      </div>
</template>
<script>
export default {
    props:{
        'steps':{
            default:0
        }
    },
    data(){
        return {
            stepsData: ["注册", "认证", "审核状态"]
        }
    }
    
}
</script>
<style lang="scss" scoped>
@import "../assets/css/var.scss";
.steps {
    display: flex;
    width: 325px * 3;
    margin: 0 auto;
    padding-top: 68px;
    .steps-item {
      width: 325px;
      border-top: 4px solid $border;
      padding: 23px 0;
      text-align: center;
      font-size: 16px;
      color: $color-not-matter;
      position: relative;
      & > span {
        font-size: 20px;
        color: #fff;
        position: absolute;
        top: -14px;
        left: 50%;
        transform: translate(-50%, 0);
      }
      &::before {
        content: "";
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 100%;
        background: $border;
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .active {
      border-top: 4px solid $primary;
      &::before {
        background: $primary;
      }
    }
  }
</style>


