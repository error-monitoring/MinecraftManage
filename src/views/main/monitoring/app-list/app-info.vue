<template>
    <div>
        <el-card class="no-border" shadow="always">
            <template slot="header">
                    <div>
                        <span>应用信息</span>
                    </div> 
                    <div>
                        <el-button v-if="btnText" size="medium"  type="primary" :disabled="btnDisabled"  @click="updateStatusConfirm">{{btnText}}</el-button>
                    </div>
</template>
            <div class="content">
                <div class="content-left">
                    <img :src="info.dapp_icon_url" alt="">
                </div>
                <div class="content-right">
                    <h2>{{info.dapp_name}}</h2>
                    <div class="dapp-type">
                        <mHelp class="m-help"  :width=500 :isWords=true placement="right" :text="text" />
                        <span>状态:
                             <!-- 1 开发中、2 审核中、3 审核未通过、4 上线、5 下线 -->
                            <span v-if="info.status==1" >开发中</span>
                            <span v-if="info.status==2">审核中</span>
                            <span v-if="info.status==3" >审核未通过</span>
                            <span v-if="info.status==4">上线</span>
                            <span v-if="info.status==5" >下线</span>
                        </span>
                        </div>
                        <div class="line"></div>
                    <h2>开发配置</h2>
                    <div class="info-list">
                        <div class="info-list-left padding">DAppKey:</div>
                        <div class="info-list-right">{{info.dapp_key}}</div>
                    </div>
                     <div class="info-list">
                        <div class="info-list-left padding">DAppSecret:</div>
                        <div class="info-list-right">{{info.dapp_secret}}</div>
                    </div>
                     <div class="info-list">
                        <div class="info-list-left padding">应用网关:</div>
                        <div class="info-list-right">{{info.dapp_gateway_url}}</div>
                    </div>
                     <div class="info-list">
                        <div class="info-list-left ">
                            <mHelp class="m-help"  :isWords=true placement="bottom" text="商户授权给该应用后，商户将进入该回调地址进行设置" />
                            <span>应用回调地址:</span>
                        </div>
                        <div class="info-list-right">
                            <a class="btn" v-if="!info.dapp_back_url" @click="openUpdateBackUrlDialog">设置</a>
                            <p v-else>{{info.dapp_back_url}}</p>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="tab-title">
                接口信息
            </div>
            <el-table :data="list" style="width: 100%" v-loading="false">

                <el-table-column prop="name" label="接口名称">

                </el-table-column>
                <el-table-column prop="info" label="接口介绍">

                </el-table-column>
                <el-table-column label="接口状态">
                <template slot-scope="scope">
                    <el-tag size="small" type="secondary">已开通</el-tag>
                </template>
                </el-table-column>

                <el-table-column width="150" label="操作">
                <template slot-scope="scope">
                    --
                </template>
                </el-table-column>
            </el-table>
            <div class="footer-btn">
                <el-button @click="backDAppList">返 回</el-button>
                <el-button type="info" @click="removeDApp" v-if="info.status != 2 && info.status != 4">删除应用</el-button>
                <el-button type="primary" @click="editDApp" :disabled="info.status == 2 || info.status == 4">编辑应用</el-button>
            </div>
   </el-card>
   <add-app :editDate="info" edit-type="edit" :drawer-show.sync="drawerShow"  @saveSuccess="saveSuccess"></add-app>

   <el-dialog  :title="`${info.dapp_name}`" :visible.sync="dialogVisible" width="500px">
        <el-form label-position="top" :model="formData" :rules="rule" status-icon ref="ruleForm">
            <el-form-item label="应用回调地址" prop="dapp_back_url">
                <el-input auto-complete="off" placeholder="请输入以https://或者http://开头的回调地址" v-model="formData.dapp_back_url">
                </el-input>
            </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateBackUrl">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import dappApi from "@/api/app-list.js";
import mHelp from "@/components/m-help";
import { checkUrlFun } from "@/serving/checkRule.js";
import addApp from "./add-app";
import storageServing from '@/serving/storage.serving.js';
export default {
  data() {
    return {
        // 应用信息
      info: {},
      text: `开发中：开发者创建应用后，状态即为“开发中”；</br>
                    审核中：开发者应用开发完成，可提交上线申请，等待审核时状态为“审核中”；</br>
                    审核未通过：开发者提交应用上线审核，被拒绝审核通过上线时，状态为“审核未通过”；</br>
                    上线：开发者提交应用上线审核，审核通过上线时，状态为“上线”；</br>
                    下线：开发者对应用提交“下线”申请时，立即下线。`,

      dialogVisible: false,
      formData: {
        dapp_back_url: ""
      },
      tableData: [],
      // 按钮是否禁用
      btnDisabled: true,
      // 按钮文字
      btnText: "",
      // 应用id
      id: "",
      // 是否显示编辑
      drawerShow:false,
      list:[
        {
          name:'MID授权',
          info:'用户授权后，使用simplet账号登录',
          status:'已开通'
        },
        {
          name:'Token 支付',
          info:'调用simplet使用token支付的能力',
          status:'已开通'
        },
      ],
      rule: {
        dapp_back_url: [
          {
            required: true,
            validator: checkUrlFun,
            name: "应用回调地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    mHelp,
    addApp
  },
  created() {
    this.id = this.$route.params.id;
    this.getInfo();
  },
  methods: {
    //   获取用户信息
    async getInfo() {
      const { code, data } = await dappApi.info({
        id: this.id
      });
      if (code == 0) {
        this.info = data;
        this.setBtnStatus();
      }
    },
    // 设置按钮状态
    setBtnStatus() {
      // 1 开发中、2 审核中、3 审核未通过、4 上线、5 下线
      const status = this.info.status;
      if (status == 1 || status == 3 || status == 5) {
        (this.btnText = "申请上线"), (this.btnDisabled = false);
      } else if (status == 2) {
        (this.btnText = "审核中"), (this.btnDisabled = true);
      } else if (status == 4) {
        (this.btnText = "申请下线"), (this.btnDisabled = false);
      }
    },

    // 打开修改应用地址弹框
    openUpdateBackUrlDialog() {
      this.dialogVisible = true;
       // eslint-disable-next-line
      try {
        this.$refs["ruleForm"].resetFields();
         // eslint-disable-next-line
      } catch (error) {}
    },
    // 修改应用回调地址
    updateBackUrl() {
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          const params = {
            id: this.$route.params.id,
            dapp_back_url: this.formData.dapp_back_url
          };
          const { code, message } = await dappApi.updateBackUrl(params);
          if (code === 0) {
            this.$message.success("成功");
            this.dialogVisible = false;
            this.getInfo();
          } else {
            this.$message.error(message);
          }
        }
      });
    },
    // 修改前确认
    updateStatusConfirm() {
      let type, text;
      const status = this.info.status;

      if (status == 1 || status == 3 || status == 5) {
        type = 1;
        text = "您的应用已开发并调试完成，确认提交应用上线？";
      } else if (status == 4) {
        type = 2;
        text = "您的应用的下线可能会影响其他使用者，确认提交应用下线？";
      }
      this.$confirm(text, "提示", {
        confirmButtonText: "提交",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.updateStatus(type);
        })
        .catch(() => {});
    },
    // 修改应用状态
    async updateStatus(type) {
      const { code, message } = await dappApi.updateStatus({
        type,
        id: this.id
      });
      if (code === 0) {
        if(type == 2){
          this.$message.success("提交申请成功");
        }else{
          this.$message.success("下线成功");
        }
        this.getInfo();
      } else {
        this.$message.error(message);
      }
    },
    // 删除应用
    async removeDApp() {
      this.$confirm("此操作将永久删除该应用, 是否继续?", "提示", {
        confirmButtonText: "确定删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { code, message } = await dappApi.delete({
            id: this.id
          });
          if (code === 0) {
            this.$message.success("成功");
            this.backDAppList();
          } else {
            this.$message.error(message);
          }
        })
        .catch(() => {});
    },
    // 编辑应用
    editDApp() {
        this.drawerShow = true;
    },

    // 修改成功
    saveSuccess(){
      this.getInfo();
    },
    // 返回列表
    backDAppList() {
      this.$router.push({
        name: "app-list"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  margin-top: 30px;
  .content-left {
    width: 172px;
    margin-right: 30px;
    img {
      width: 172px;
      height: 172px;
      border-radius: 20px;
    }
  }
  .content-right {
    flex: 1;
    color: #666;
    font-size: 12px;
    & > h2 {
      font-size: 14px;
      color: #666;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .dapp-type {
      position: relative;
      padding-left: 26px;
      .m-help {
        position: absolute;
        left: 0;
        top: -1px;
      }
    }
    .line {
      border: 1px dashed rgba(216, 216, 216, 0.4);
      margin: 20px 0;
    }
    .info-list {
      display: flex;
      line-height: 22px;
      .info-list-left {
        width: 124px;
        position: relative;
        padding-left: 26px;
        .m-help {
          position: absolute;
          left: 0;
          top: -1px;
        }
      }
      .btn {
        color: #564fc1;
        font-size: 12px;
        cursor: pointer;
        text-decoration: underline;
        // s
      }
    }
  }
}

.tab-title {
  height: 20px;
  font-size: 14px;
  color: rgba(102, 102, 102, 1);
  padding-bottom: 20px;
  border-bottom: 1px solid #ebeef5;
}

.footer-btn {
  margin-top: 15px;
}
</style>

