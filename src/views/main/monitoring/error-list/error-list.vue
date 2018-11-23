<template>
    <div>
        <G2Line  />
        <el-card class="no-border" shadow="always">
            <el-table :data="tableData" style="width: 100%" v-loading="loading">

                <el-table-column prop="dapp_key" label="DAppKey">
                </el-table-column>
                <el-table-column width="150" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <m-pagination :action="getList" v-model="pageVaule" :total="total"></m-pagination>
        </el-card>
    </div>
</template>
<script>
import mPagination from "@/components/m-pagination";
import userApi from "../../../../api/user.js";
import dappApi from "../../../../api/app-list.js";
import G2Line from '@/components/G2Line'
export default {
  data() {
    return {
      tableData: [],
      editType: "add",
      drawerShow: false,
      status: "",
      pageVaule: {},
      total: 0,
      loading: false
    };
  },
  components: {
    mPagination,
    G2Line
  },
  created() {
    // this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      let params = {
        page_number: this.pageVaule.page_number || 1,
        page_size: this.pageVaule.page_size || 10
      };
      const { code, data } = await dappApi.list(params);
      if (code == 0) {
        this.loading = false;
        this.tableData = data.list;
        this.total = data.total_count;
      }
    },

  }
};
</script>
<style lang="scss" scoped>
.item—img {
      display: flex;
    align-items: center;
  img{
    width: 16px;
    height: 16px;
    margin-right: 10px;
  }
}
</style>

