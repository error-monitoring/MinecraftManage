<template>
    <div>
        <el-card class="no-border" shadow="always">
            <template slot="header">
                <div>
                    <span>应用管理</span>
                </div> 
                <div>
                    <el-button size="medium"  type="success" icon="icon iconfont icon-plus-circle" @click="addAPP">添加应用</el-button>
                </div>
            </template>
            <el-table :data="tableData" style="width: 100%" v-loading="loading">

                <el-table-column  label="应用名称">
                  <template slot-scope="scope">
                    <div class="item—img">
                      <img  :src="scope.row.dapp_icon_url" alt="">
                          <span>{{scope.row.dapp_name}}</span>
                    </div>    
                    </template>
                </el-table-column>
                <el-table-column prop="dapp_key" label="DAppKey">

                </el-table-column>
                <el-table-column label="上线状态">
                    <template slot-scope="scope">
                      <!-- 1 开发中、2 审核中、3 审核未通过、4 上线、5 下线 -->
                            <el-tag size="small" v-if="scope.row.status==1" type="secondary">开发中</el-tag>
                            <el-tag size="small" v-if="scope.row.status==2" type="warning">审核中</el-tag>
                            <el-tag size="small" v-if="scope.row.status==3" type="danger">审核未通过</el-tag>
                            <el-tag size="small" v-if="scope.row.status==4" type="success" >上线</el-tag>
                            <el-tag size="small" v-if="scope.row.status==5" type="info">下线</el-tag>
                    </template>
                </el-table-column>

                <el-table-column width="150" label="操作">
                    <template slot-scope="scope">
                        <!-- <el-button type="text">调试工具</el-button> -->
                        <el-button size="mini" type="primary" @click="goInfo(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <m-pagination :action="getList" v-model="pageVaule" :total="total"></m-pagination>
        </el-card>
        <add-app  edit-type="add" :drawer-show.sync="drawerShow"  @saveSuccess="saveSuccess"></add-app>
    </div>
</template>
<script>
import addApp from "./add-app";
import mPagination from "../../../components/m-pagination";
import userApi from "../../../api/user.js";
import dappApi from "../../../api/app-list.js";
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
    addApp,
    mPagination
  },
  created() {
    this.getList();
    this.getUserState();
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
    async getUserState() {
      let { code, data } = await userApi.userInfo();
      if (code === 0) {
        this.status = data.status;
      }
    },
    addAPP() {
      if (this.status != 1) {
        this.$alert(
          "您还未对账号进行认证，点击右上角“账号管理”进行认证，认证通过后即可操作管理后台。",
          "提示",
          {
            confirmButtonText: "确定",

            callback: () => {}
          }
        );
      } else {
        this.drawerShow = true;
        this.editType = "add";
      }
    },
    updateSuccess() {},
    saveSuccess() {
      this.getList();
    },
    goInfo({ id }) {
      this.$router.push({ name: "app-info", params: { id } });
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

