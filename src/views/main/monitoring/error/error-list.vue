/*
 * @Author: wenquan.huang 
 * @Date: 2018-12-17 14:40:23 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-17 17:34:42
 */

<template>
  <div class="error-list">
    <div class="left">
      <div class="item" v-for="(item, index) in list" :key="index">{{item.id}}</div>
    </div>
    <div class="right">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="基本信息" name="first">基本信息</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
export default {
  data() {
    return {
      activeName2: "first",
      list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    freeze(obj) {
      Object.freeze(obj);
      if (obj instanceof Array) {
        obj.forEach(item => {
          if (typeof value === "object") {
            this.freeze(value);
          }
        })
      } else if (obj instanceof Object) {
        Object.values(obj).forEach((value, index) => {
          if (typeof value === "object") {
            this.freeze(value);
          }
        });
      }
    },
    async getList() {
      let params = {
        page_number: 1,
        page_size: 1000,
        md5: this.$route.params.md5
      };
      const { code, data } = await this.$monitoringError.errorList(params);
      if (code == 0) {
        this.freeze(data);


        this.list = data.list.map(item => {
          item.brower_info = JSON.parse(item.brower_info);
          item.os_info = JSON.parse(item.os_info);
          item.created_at = format(item.created_at, "MM-DD hh:mm:ss");
          return item;
        });
        console.log(this.list);
      }
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.error-list {
  display: flex;
  height: 100%;
  padding: -15px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 4px;
  .left {
    width: 300px;
    height: 100%;
  }
  .right {
    height: 100%;
    flex: 1;
    // background: hotpink;
  }
}
</style>

