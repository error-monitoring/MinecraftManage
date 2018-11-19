
<template>

    <!-- 鼠标移入 -->
    <el-tooltip class="help" v-if="isWords" :placement="placement">
        <div v-bind:style="{ maxWidth: width + 'px' }" slot="content" v-html="text"></div>
         <i class="icon iconfont icon-bangzhu"></i>
    </el-tooltip>


    <!-- 跳转   -->
    <el-tooltip class="help"  v-else :placement="placement">
        <div v-bind:style="{ maxWidth: width + 'px' }" slot="content">{{text}}</div>
         <i class="icon iconfont icon-bangzhu" @click="toExplain"></i>
    </el-tooltip>
	
</template>

<script>
export default {
    name: "help-url",
    props: {
        //跳转的url
        url: {
            type: String,
            default: "event-manage"
        },
        // 是不是文字 
        isWords: {
            type: Boolean,
            default:false
        },
        //文字内容
        text: {
            type: String,
            default: ""
        },
        // 浮窗的位置
        placement:{
            type: String,
            default: "top"
        },
        // 浮窗的宽度
        width:{
            type:Number,
            default:200
        }
    },
    data() {
        return {};
    },

    methods: {
        toExplain() {
			// window.location.href="http://merculet-helpcentercn.liaoyantech.cn/doc/product"
            window.open(
            );
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";
.help{
    margin-left: 5px;
}
.icon-shuoming,.icon-bangzhu{
    cursor: pointer;
    color: $primary;
}
</style>
