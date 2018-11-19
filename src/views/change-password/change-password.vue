<template>
    <div class="main">
        <div class="main-title">
            修改密码
        </div>
        <div class="main-content">
            <el-form label-position="top" :model="formData" :rules="ruleStep1" status-icon ref="form">
                <!-- <el-form-item label="手机号" prop="phone_number">
                    <el-input auto-complete="off" placeholder="请输入手机号" v-model="formData.phone_number">
                    </el-input>
                </el-form-item> -->
                <el-form-item label="原密码" prop="old_password">
                    <el-input type="password" auto-complete="off" placeholder="请输入原密码" v-model="formData.old_password">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" auto-complete="off" placeholder="请输入密码" v-model="formData.password">
                    </el-input>
                </el-form-item>
                <p class="info">请设置8—20位密码，仅支持数字、英文，英文区分大小写。</p>
                <el-form-item label="重复新密码" prop="checkPwd">
                    <el-input type="password" auto-complete="off" placeholder="请重复新密码" v-model="formData.checkPwd">
                    </el-input>
                </el-form-item>

                <el-form-item class="reg">
                    <el-button type="primary" :loading="submitLoading" @click="submit">确认修改密码</el-button>
                </el-form-item>
    
            </el-form>
        </div>
    </div>
</template>

<script>
import userApi from "../../api/user.js";
import storageServing from '../../serving/storage.serving.js';
import { checkPasswordFun, checkPwdFun, checkRequiredFun } from '../../serving/checkRule.js';
export default {
  data() {
    return {
      formData: {
        // 原密码
        old_password: "",
        // 密码
        password: "",
        checkPwd: "",
        phoneValue: "86",
        
      }, //上传数据
      ruleStep1: {
        old_password: [
          {
            required: true,
            validator: checkRequiredFun,
            name:'请输入原密码',
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: checkPasswordFun,
            checkPwdName: "checkPwd",
            trigger: "blur"
          }
        ],
        checkPwd: [
          {
            required: true,
            validator: checkPwdFun,
            self: this,
            oldPasswordName: "password",
            dataName: "formData",
            trigger: "blur"
          }
        ],
        sms_verify_code: [
          {
            required: true,
            validator: checkRequiredFun,
            name: "请输入验证码",
            trigger: "blur"
          }
        ]
      }, //校验规则
      submitLoading:false
    };
  },
  methods: {
    async submit() {
      this.$refs["form"].validate(async valid => {
        if (valid) {
          const password = this.formData.password
          const old_password = this.formData.old_password
          if(password === old_password) {
            this.$message.error('新密码不能和原密码相同');
            return

          }
          this.submitLoading = true
          const params = {
            password,
            old_password
          };
          const { code, message } = await userApi.updatePassword(params);
          if (code === 0) {
            this.$message.success('修改成功')
            storageServing.clear()
            this.$store.commit('setUserInfo', {})
            this.$router.push({name: "login"});
          } else {
            this.$message.error(message);
          }
          this.submitLoading = false
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  .main-title {
    font-size: 18px;
    color: #4a4a4a;
    font-weight: 900;
    border-bottom: 1px solid #d8d8d8;
    margin: 0 30px;
    padding: 23px 20px;
    margin-bottom: 30px;
  }
  .main-content {
    width: 450px;
    margin: 0 auto;
  }
   .info {
    font-size: 12px;
    color: #999;
    margin-bottom: 10px;
  }
  .reg {
    text-align: center;
    button {
      // width: 218px;
    }
  }
}
</style>



