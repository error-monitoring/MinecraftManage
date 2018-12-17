/*
 * @Author: wenquan.huang 
 * @Date: 2018-12-17 14:58:00 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-17 15:41:35
 * 错误聚合列表
 */

<template>
    <div>
        <el-card class="no-border" shadow="always">
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
      const { code, data } = await this.$monitoringError.aggregateErrorList(params);
      if (code == 0) {
        this.loading = false;
        this.tableData = data.list;
        this.total = data.count;
      }
    },

    goInfo({ md5 }) {
      this.$router.push({ name: "monitoring-error-list", params: { md5 } });
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

