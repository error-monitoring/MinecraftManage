
<template>
    <div>
        <m-drawer :visible.sync="show" :title="editType === 'add' ? '添加应用' : '编辑应用'" @open="handleOpen">
            <el-form v-if="show" label-position="top" :model="formData" :rules="rule" status-icon ref="ruleForm">
                <el-form-item label="应用名称" prop="dapp_name">
                    <el-input class="item-input" auto-complete="off" placeholder="应用名称" v-model="formData.dapp_name" >
                    </el-input>
                </el-form-item>
                <p class="upload-img-text"><span>*</span> 应用ICON</p>
                <el-row>
                    <el-col :span="10" :offset="0">
                        <el-form-item prop="dapp_icon_url" class="mw-form-validation mw-is-flex">
                            <m-upload v-model="formData.dapp_icon_url"></m-upload>
                        </el-form-item>
                    </el-col>
                </el-row>
                <p class="info">建议尺寸200*200PX，大小不超过3M，支持PNG和JPG格式</p>
                <el-form-item label="应用官网" prop="dapp_official_website">
                    <el-input class="item-input" auto-complete="off" placeholder="请输入以https://或者http://开头的应用官网" v-model="formData.dapp_official_website">
                    </el-input>
                </el-form-item>
                <el-form-item label="应用简介" prop="dapp_intro" >
                    <el-input class="item-input" :autosize="{ minRows: 4, maxRows: 6}" type="textarea" placeholder="50个字内。" v-model="formData.dapp_intro">
                    </el-input>
                </el-form-item>
    
            </el-form>
            <template slot="footer">
                <el-button size="medium" type="info" plain @click="cancel">返回</el-button>
                <el-button size="medium" type="primary" class="save" @click="onSubmit">创建</el-button>
            </template>
        </m-drawer>
    </div>
</template>

<script>
import mDrawer from "../../../components/m-drawer";
import mUpload from "../../../components/m-upload";
import dappApi from '../../../api/app-list.js'
import {
  checkNameFun,
  checkRequiredFun,
  checkUrlFun
} from "../../../serving/checkRule.js";

export default {
  name: "add-app",
  // 新的双向绑定机制
  model: {
    prop: "drawerShow",
    event: "update"
  },
  props: {
    drawerShow: {
      type: Boolean,
      default: false
    },
    editType: {
      type: String,
      default: "add"
    },
    editDate:{
      type:Object
    }
  },
  data() {
    return {
      formData: {
        //   应用名称
        dapp_name: "",
        // 应用icon
        dapp_icon_url: "",
        // 应用官网
        dapp_official_website: "",
        // 应用简介
        dapp_intro: ""
      },
      rule: {
        dapp_name: [
          {
            required: true,
            validator: checkNameFun,
            name: "应用名称",
            trigger: "blur"
          }
        ],
        dapp_icon_url: [
          {
            required: true,
            validator: checkRequiredFun,
            name: "请上传应用icon",
            trigger: "blur"
          }
        ],
        dapp_official_website:[
            {
            validator: checkUrlFun,
            name: "应用官网",
            trigger: "blur"
          }
        ],
        dapp_intro: [
          {
            required: true,
            validator: checkNameFun,
            max:50,
            name: "应用简介",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    mDrawer,
    mUpload
  },
  computed: {
    show: {
      get: function() {
        return this.drawerShow;
      },
      set: function(v) {
        this.$emit("update:drawerShow", v);
      }
    },

  },
  methods: {
    handleOpen() {},

    // 保存app
    async saveApp(){
      const {code,message} = await dappApi.add(this.formData)
      if(code == 0){
        this.$message.success('成功')
        this.$emit('saveSuccess')
        this.cancel()
      }else{
        this.$message.error(message)
      }
    },

    // 修改app
    async updateApp(){
      const {code,message} = await dappApi.edit(this.formData)
      if(code == 0){
        this.$message.success('成功')
        this.$emit('saveSuccess')
        this.cancel()
      }else{
        this.$message.error(message)
      }
    },

    // 提交验证
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
            
          if(this.editType=='add'){
              this.saveApp();
          }else{
              this.updateApp();
          }
        }
      });
    },
    cancel() {
       this.$refs["ruleForm"].resetFields();
      this.$emit("update:drawerShow", false);
    }
  },
  watch:{
    editDate(old){
      if(this.editType == 'edit'){
        this.formData = old
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import '../../../assets/css/var.scss';
.item-input{
    width: 400px;
}
.upload-img-text {
  font-size: 14px;
  color: $color-not-matter;
  margin-bottom: 10px;
  span {
    color: #f4516c;
  }
}
.info {
  font-size: 12px;
  color: #999;
}
</style>

