<template>
  <div>
    <el-card class="no-border" shadow="always">
      <template slot="header">
        <div>
          <span>应用管理</span>
        </div>
        <div>
          <el-button
            size="medium"
            type="success"
            icon="icon iconfont icon-xinzeng"
            @click="addAPP"
          >添加应用</el-button>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="应用名称"></el-table-column>
        <el-table-column prop="app_key" label="AppKey"></el-table-column>
        <el-table-column prop="monitoring_code" label="监控CODE"></el-table-column>
        <el-table-column prop="monitoring_urls" label="监控地址"></el-table-column>

        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <!-- <el-button size="mini" type="primary" @click="goInfo(scope.row)">查看</el-button> -->
            <el-button size="mini" type="primary" @click="edit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <m-pagination :action="getList" v-model="pageVaule" :total="total"></m-pagination>
    </el-card>
    <add-app
      :edit-type="editType"
      :id="id"
      :drawer-show.sync="drawerShow"
      @saveSuccess="saveSuccess"
    ></add-app>
  </div>
</template>
<script>
import addApp from "./add-app";
import mPagination from "@/components/m-pagination";
export default {
  data() {
    return {
      tableData: [],
      editType: "add",
      drawerShow: false,
      status: "",
      pageVaule: {},
      total: 0,
      loading: false,
      id: null
    };
  },
  components: {
    addApp,
    mPagination
  },
  created() {
    this.getList();
  },
  methods: {
    edit(row) {
      this.editType = "edit";
      this.id = row.id;
      this.drawerShow = true;
    },

    async getList() {
      this.loading = true;
      let params = {
        page_number: this.pageVaule.page_number || 1,
        page_size: this.pageVaule.page_size || 10
      };
      const { code, data } = await this.$monitoringApp.list(params);
      if (code == 0) {
        this.loading = false;
        this.tableData = data.list;
        this.total = data.count;
      }
    },

    addAPP() {
      this.drawerShow = true;
      this.editType = "add";
    },
    updateSuccess() {},
    saveSuccess() {
      this.getList();
    },
    goInfo({ id }) {
      this.$router.push({ name: "monitoring-app-info", params: { id } });
    }
  }
};
</script>
<style lang="scss" scoped>
.item—img {
  display: flex;
  align-items: center;
  img {
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
}
</style>

