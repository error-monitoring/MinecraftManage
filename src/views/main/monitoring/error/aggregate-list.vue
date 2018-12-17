<template>
    <div>
        <!-- <G2Line  /> -->
        <el-card class="no-border" shadow="always">
            <template slot="header">
                <div>
                    <span>错误列表</span>
                </div> 
                <div>
                    <!-- <el-button size="medium"  type="success" icon="icon iconfont icon-plus-circle" @click="addAPP">添加应用</el-button> -->
                </div>
            </template>
            <el-table :data="tableData" style="width: 100%" v-loading="loading">

                <el-table-column prop="error_url" label="错误地址">
                </el-table-column>
                <el-table-column prop="error_type" label="错误类型">
                </el-table-column>
                <el-table-column prop="error_count" label="错误次数">
                </el-table-column>
                <el-table-column  label="创建时间">
                  <template slot-scope="scope">
                        <span>{{scope.row.created_at | date}}</span>
                    </template>
                </el-table-column>
                <el-table-column width="150" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="goInfo(scope.row)" >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <m-pagination :action="getList" v-model="pageVaule" :total="total"></m-pagination>
        </el-card>
    </div>
</template>
<script>
import mPagination from "@/components/m-pagination";
import errorApi from "@/api/monitoring/error-list.js";
// import G2Line from '@/components/G2Line'
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
    // G2Line
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.loading = true;
      let params = {
        page_number: this.pageVaule.page_number || 1,
        page_size: this.pageVaule.page_size || 10
      };
      const { code, data } = await errorApi.list(params);
      if (code == 0) {
        this.loading = false;
        this.tableData = data.list;
        this.total = data.count;
      }
    },

    goInfo({ id }) {
      this.$router.push({ name: "monitoring-error-info", params: { id } });
    }

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

