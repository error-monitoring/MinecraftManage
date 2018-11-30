<template>
  <div>
    <h5>{{info.file_name}}</h5>
    <ul>
      <li v-for="(item,index) in list" :key="index" >
        <div :class="{active: index == info.error_line}">{{index +1}}</div>

        <pre v-highlight v-if="index != info.error_line">
            <code>{{item}}</code>
        </pre>
        <pre v-highlight v-else  >
            <code >{{item}} {{info.message}} {{info.errorTypeDetails}}</code>
        </pre>
      </li>
    </ul>
  </div>
</template>

<script>
import errorApi from "@/api/monitoring/error-list.js";
export default {
  data() {
    return {
      info: {},
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      let params = {
        id: this.$route.params.id
      };
      const { code, data } = await errorApi.info(params);
      if (code == 0) {
        this.info = data;
        this.list = data.rawLines;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
ul {
  background: #23241f;
  margin: 0;
  padding: 30px 0;
  border-radius: 5px;
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
  }
}
.active {
  background: #d73a49;
  color: #fff !important;

}

pre{
    margin: 0;
    height: 25px;
    white-space: inherit;
    line-height: 25px;
}
code{
    padding: 0px;
    white-space: pre;
}
</style>

