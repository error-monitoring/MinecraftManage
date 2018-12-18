/*
 * @Author: wenquan.huang 
 * @Date: 2018-12-17 14:40:23 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-18 00:14:00
 */

<template>
  <div class="error-list">
    <div class="left">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="index"
        :class="{active:index == active}"
        @click="clickItem(item, index)"
      >
        <div class="item-top">
          <span>日期:{{item.created_at}}</span>
        </div>
        <div class="item-info">
          <span>系统:{{item.os_info.os_name}}</span>
          <span>浏览器:{{item.brower_info.browser_type}}</span>
        </div>
      </div>
    </div>
    <div class="right">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane v-if="activeName == 'info'" class='tabs' label="基本信息" name="info">
          <errorDetails :details="details" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";
import errorDetails from '@/components/error/error-details'
export default {
  data() {
    return {
      activeName: "info",
      active: 0,
      details:{},
      list: []
    };
  },
  components:{
    errorDetails
  },
  async created() {
    await this.getList();
    this.getDateils()
  },
  methods: {
    async getList() {
      let params = {
        page_number: 1,
        page_size: 1000,
        md5: this.$route.params.md5
      };
      const { code, data } = await this.$monitoringError.errorList(params);
      if (code == 0) {
        data.list = data.list.map(item => {
          item.brower_info = JSON.parse(item.brower_info);
          item.os_info = JSON.parse(item.os_info);
          item.created_at = format(item.created_at, "YYYY-MM-DD HH:mm:ss");
          return item;
        });
        this.$freeze(data.list);
        this.list = data.list;
      }
    },
    async getDateils() {
      const {id} =  this.list[this.active] 
      const { code, data } = await this.$monitoringError.getDateils({id});
      if (code == 0) {
        this.$toJson(data);
        this.$freeze(data);
        this.details = data
      }
    },
    clickItem(item, index){
      this.active = index
      this.getDateils()
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
    overflow-y: auto;
    box-sizing: border-box;
    border-right: 1px solid #e4e7ed;
    margin-right: 10px;
    .item {
      height: 52px;
      border-bottom: 1px solid #f8f8f8;
      border-left: 8px solid #fff;
      padding: 5px;
      
      cursor: pointer;
      color: #666;
      .item-top {
        display: flex;
        justify-content: space-between;
      }
      .item-info {
        font-size: 14px;
        margin-top: 5px;
        & > span {
          margin-right: 5px;
        }
      }
      &:hover {
        background: #fbfbfc;
      }
      &.active {
        background: #f0f0f0;
        border-left: 8px solid #564fc1;
      }
    }
  }
  .right {
    height: 100%;
    flex: 1;
    padding: 10px 0;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>

