<template>
  <el-row id="login-main">
  
    <el-col :span="15">
      <div class="login-l">
        <div class="cont-wrap">
          <div class="logo" @click="jumpHome">
            <div class="logo-img">
              <img src="@/assets/images/login/logo.png" alt="">
            </div>
            <div class="logo-text">
              Minecraft
            </div>
          </div>
          <div class="tab-wrap">
            <img src="http://piyar362w.bkt.clouddn.com/img1.png" alt="">
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="9">
      <div class="login-r">
        <div class="login-wrap">
          <div class="logo-text">
            Minecraft
          </div>
          <el-form label-position="top" label-width="0" :rules="rule_data" :model="updata" ref="updata">
            <el-form-item label="邮箱" prop="email">
              <el-input  placeholder="请输入邮箱" auto-complete="off" v-model="updata.email">
  
              </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" placeholder="请输入密码" auto-complete="off" v-model="updata.password" @keyup.enter.native="Login('data')">
  
              </el-input>
            </el-form-item>
            <el-form-item class="login-bot">
              <el-button type="primary" class="reg" @click="Login" :loading="loading">登录</el-button>
              <div class="login-prompt">
                <!-- <div class="btn-regist">
                  还没有账号？
                  <span @click="goRegist">现在注册</span>
                  <span @click="goRetrieve" class="retrieve">忘记密码？</span>
                </div> -->
                <div class="chrome">建议使用Chrome浏览器操作</div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import userApi from '../../api/user';
import { checkPasswordFun, checkEmailFun } from '../../serving/checkRule';
export default {
  name: "login",
  components: {},
  data() {
    return {
      updata: {
        email: "wenquan.huang@merculet.io",
        password: "123456"
      },
      loading: false,
      // 验证
      rule_data: {
        email: [
          {
            required: true,
            validator: checkEmailFun,
            name:'邮箱',
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: checkPasswordFun,
            trigger: "blur"
          }
        ]
      },
    };
  },

  methods: {
    jumpHome() {
      this.$router.push({
        path: "/"
      });
    },
    // 登录前校验
    Login() {
      this.$refs["updata"].validate(valid => {
        if (valid) {
          this.goLogin();
        } else {
          // 验证失败
          return false;
        }
      });
    },

    // 触发登录
    async goLogin() {
      this.loading = true;
      const { data, code, message } = await userApi.login(this.updata);
      this.loading = false;
      if (code == 0) {
        this.$storage.set(data.token, "token");
        this.$store.commit('setUserInfo', data.user)
        this.$router.push({
          name: "monitoring-app-list",
        });
      } else {
        this.$message.error(message);
      }
    },
    // 跳转到注册页面
    goRegist() {
      this.$router.push({
        name: "regist"
      });
    },
    // 跳转到忘记密码页面
    goRetrieve(){
      this.$router.push({
        name: "retrieve-password",
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import '../../assets/element-ui/element-variables.scss';
#login-main {
  height: 100vh;
  width: 100vw;
  background-image: $--color-bg;
  overflow-x: hidden;
  .el-col {
    height: 100%;
  }
  .login-l {
    height: 100%;
    position: relative;
    overflow: hidden;
    .cont-wrap {
      width: 768px;
      float: right;
      .logo {
        display: flex;
        margin-top: 30px;
        .logo-img{
          width:149px;
          height: 33px;
          img{
            widows: 100%;
            height: 100%;
          }
        }
        .logo-text{
          color: #fff;
          font-size: 19px;
          height: 23px;
          line-height: 23px;
          border-left: 1px solid #fff;
          margin-left: 11px;
          padding-left: 9px;
          margin-top: 8px;
          font-weight: 900;
        }
      }
      .small-logo {
        position: absolute;
        top: 30%;
        img {
          position: relative;
          z-index: 9;
        }
      }
    }
  }
  .login-r {
    height: 100%;
    min-height: 660px;
    background: #fff;
    .login-wrap {
      width: 350px;
      padding-top: 104px;
      margin-left: 60px;
      .logo-text {
         height:67px;
          font-size:48px;
          font-family:"PingFangSC-Regular";
          font-weight:400;
          color:$--color-primary;
          line-height:67px;
          font-weight: 900;
          margin-bottom: 108px;
      }
      .login-bot {
        padding-top: 20px;
        text-align: center;
        .el-button {
          width: 100%;
        }
        .login-prompt {
          margin-top: 15px;
          font-size: 14px;
          line-height: 20px;
          color: #666;
          > a {
            text-decoration: none;
            color: $--color-primary;
            font-size: 14px;
            line-height: 20px;
          }
        }
        .forget-pwd {
          line-height: 20px;
          margin: 36px 0 75px;
        }
        .btn-regist {
          text-align: left;
          margin-top: 0px;
          font-size: 14px;
          line-height: 20px;
          color: #878787;
          span {
            color: $--color-primary;
            cursor: pointer;
          }
          .retrieve{
            margin-left: 132px;
          }
        }
        .chrome {
          margin-top: 6px;
          text-align: left;
          font-size: 14px;
          line-height: 20px;
          color: #878787;
        }
      }
    }
  }
}

.tab-wrap {
  width: 650px;
  height: 513px;
  position: fixed;
  bottom: 60px;
  right: calc(37.5%+106vw - 100%);
  img{
    width:100%;
    height:100%;
  }
}



#mw-footer.is-fixed {
  z-index: 99;
}

</style>
