
<template>
  <div>
    <m-drawer :visible.sync="show" :title="editType === 'add' ? '添加应用' : '编辑应用'" @open="handleOpen">
      <el-form
        v-if="show"
        label-position="top"
        :model="formData"
        :rules="rule"
        status-icon
        ref="ruleForm"
      >
        <el-form-item label="应用名称" prop="name">
          <el-input
            class="item-input"
            auto-complete="off"
            placeholder="应用名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>

        <el-form-item label="监控地址" prop="monitoring_urls">
          <el-input
            class="item-input"
            auto-complete="off"
            placeholder="请输入以https://或者http://开头的地址"
            v-model="formData.monitoring_urls"
          ></el-input>
        </el-form-item>
        <el-form-item label="监控Code" prop="monitoring_code">
          <el-input class="item-input" placeholder="code" v-model="formData.monitoring_code"></el-input>
        </el-form-item>
        <el-form-item label="SourceMapUrl" prop="source_map_url">
          <el-input class="item-input" placeholder="code" v-model="formData.source_map_url"></el-input>
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
import mDrawer from "@/components/m-drawer";
import {
  checkNameFun,
  checkRequiredFun,
  checkUrlFun
} from "@/serving/checkRule.js";

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
    id: {
      type: Number,
      default: null
    },
    editDate: {
      type: Object
    }
  },
  data() {
    return {
      formData: {
        name: "",
        monitoring_code: "",
        monitoring_urls: "",
        source_map_url: ""
      },
      rule: {
        name: [
          {
            required: true,
            validator: checkNameFun,
            name: "应用名称",
            trigger: "blur"
          }
        ],
        source_map_url: [
          {
            required: true,
            validator: checkNameFun,
            name: "下载地址",
            trigger: "blur"
          }
        ],

        monitoring_urls: [
          {
            required: true,
            validator: checkUrlFun,
            name: "应用官网",
            trigger: "blur"
          }
        ],
        monitoring_code: [
          {
            required: true,
            validator: checkNameFun,
            name: "CODE",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    mDrawer,
  },
  computed: {
    show: {
      get: function() {
        return this.drawerShow;
      },
      set: function(v) {
        this.$emit("update:drawerShow", v);
      }
    }
  },
  methods: {
    handleOpen() {
      if(this.editType=='add'){
        this.formData= {
          name: "",
          monitoring_code: "",
          monitoring_urls: "",
          source_map_url: ""
        }
      }else{
        console.log(this.id);
        this.detail(this.id);
      }
    },
    async detail(id) {
      let params={
        id:id
      }
     
      const { code, data } = await this.$monitoringApp.detail(params);
      if (code == 0) {
        this.formData=data;
      }
    },

    // 保存app
    async create() {
      const { code, message } = await this.$monitoringApp.create(this.formData);
      if (code == 0) {
        this.$message.success("创建成功");
        this.$emit("saveSuccess");
        this.cancel();
      } else {
        this.$message.error(message);
      }
    },

    // 修改app
    async updateApp() {
      let parms= this.formData;
      parms.id=this.id;
      const { code, message } = await this.$monitoringApp.update(parms);
      if (code == 0) {
        this.$message.success("成功");
        this.$emit("saveSuccess");
        this.cancel();
      } else {
        this.$message.error(message);
      }
    },

    // 提交验证
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (this.editType == "add") {
            this.create();
          } else {
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
  watch: {
    editDate(old) {
      if (this.editType == "edit") {
        this.formData = old;
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/assets/css/var.scss";
.item-input {
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

