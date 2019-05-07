<template>
  <div>
    <div class="top">
      <div
        v-for="(item,index) in real_error"
        :class="{active:index == index}"
        @click="handleClick(index)"
        :key="index"
      >{{item.file_name}}</div>
    </div>
    <div class="code">
      <p>错误文件:{{info.file_name}}</p>
      <ul>
        <li v-for="(item,index) in list" :key="index">
          <div :class="{active: index == info.error_line}">{{index +1}}</div>

          <pre v-highlight v-if="index != info.error_line">
            <code>{{item}}</code>
        </pre>
          <pre v-highlight v-else>
            <code>{{item}} {{info.key}} {{info.value}}</code>
        </pre>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    real_error: {
      default: {}
    },
    id: "",
    index: {
      default: 0
    }
  },
  //
  data() {
    return {
      activeName: "",
      info: {},
      list: []
    };
  },
  mounted() {
      this.init()
  },
  methods: {
    handleClick(index) {
      this.index = index;
      this.init()
    },
    init() {
      const details = this.real_error[this.index];
      this.activeName = details.file_name;
      this.sourcemap();
    },
    async sourcemap() {
      const { code, data } = await this.$monitoringError.sourcemap({
        id: this.id,
        index: this.index
      });
      if (code == 0) {
        this.$freeze(data);
        this.info = data;
        this.list = data.rawLines;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  border-bottom: 2px solid #e4e7ed;
  padding: 10px 0;
  display: flex;
  & > div {
    cursor: pointer;
    // color: #564FC1;
    font-weight: 600;
    // background: red;
    margin-right: 5px;
    padding: 0 10px;
  }
  .active {
    color: #564fc1;
    position: relative;
    &::before {
      content: "";
      height: 2px;
      width: 100%;
      background: #564fc1;
      position: absolute;
      bottom: -12px;
      left: 0;
    }
  }
}
.code {
  & > p {
    margin: 10px 0;
  }
  ul {
    background: #282b2e;
    margin: 0;
    padding: 30px 0;
    border-radius: 5px;
    overflow-y: auto;
    margin-bottom: 60px;
  }
  li {
    list-style: none;
    font-size: 18px;
    display: flex;
    height: 25px;
    line-height: 25px;
    & > div:nth-child(1) {
      margin: 0 20px;
      border-right: 1px solid #90908a;
      display: inline-block;
      width: 30px;
      text-align: center;
      padding-right: 15px;
      color: #90908a;
      font-size: 14px;
      // 不被压缩
      flex-shrink: 0;
    }
  }
  .active {
    background: #d73a49;
    color: #fff !important;
  }

  pre {
    margin: 0;
    height: 25px;
    white-space: inherit;
    line-height: 25px;
  }
  code {
    padding: 0px;
    white-space: pre;
  }
}
</style>

