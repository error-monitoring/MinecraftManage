/*
 * @Author: wenquan.huang 
 * @Date: 2018-12-17 15:03:08 
 * @Last Modified by:   wq599263163@163.com 
 * @Last Modified time: 2018-12-17 15:03:08 
 */

<template>
    <el-container class="container">
        <m-header></m-header>

        <el-container class="container-main">
            <aside-menu :is-fixed="isFixed"></aside-menu>
            <el-main class="main-body" ref="mainBody">
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>

</template>
<script>
import asideMenu from "./aside-menu.vue";
import mHeader from './m-header'
export default {
    components: {
        asideMenu,
        mHeader
    },
    data() {
        return {
            title: '',
            user: {},
            isFixed: true,
        };
    },
    // 更新路由可以访问this
    async beforeRouteUpdate(to, from, next) {
        this.title = to.meta.title
        next();
    },
    created(){
        this.title = this.$route.meta.title
    }

    
};
</script>
<style scoped lang='scss'>
@import "../assets/css/var.scss";
.container {
    height: 100vh;
    display: block;
}



.container-main{
    height: calc(100% - 60px);
    .main-body{
        padding: 15px;
    }
}
.user-menu-icon {
    font-size: 18px;
    margin-right: 6px;
}
.header-logout {
    &:before {
        margin: 0;
    }
}
.main-body {
    position: relative;
    &.isHidden {
        overflow: hidden;
    }
    .plate-header{
        height:78px;
        .plate-title{
            font-size: 18px;
            color: #4A4A4A;
        }
        .plate-line{
            width: 0;
            height: 20px;
            border-left: 1px solid #4A4A4A;
            margin: 0 18px 0 29px;
        }
    }
}
</style>
