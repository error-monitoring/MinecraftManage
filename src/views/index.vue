<template>
    <div class="main">
        <h1>{{ msg }}</h1>
        <van-button type="primary">哈喽 你好！</van-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: ""
        }
    }
}
</script>

<style lang='scss' scoped>
.main{
    text-align: center;
    h1{
        font-size: 16px;
    }
}
</style>


