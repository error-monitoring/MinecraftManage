<template>

  <el-header class="flex end align-items-center">
    <div class="header-left flex align-items-center">
      <div class="header-logo" @click="toUrl('home')">
        <img src="../assets/images/login/logo.png" alt="">
      </div>
      <span class="header-menu-line"></span>
      <span class="header-menu-text">Minecraft</span>
    </div> 
    <a class="header-menu menu-a" @click="toUrl('home')"> 首页</a>
    <div class="header-menu menu-btn" @click="toUrl('login')" v-if="!user.phone_number">
      登录
    </div>
  
    <el-dropdown trigger="click" @command="changeCommand" class="dropdown" v-if="user.phone_number">
      <span class="el-dropdown-link">{{user.phone_number}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="account-center" divided class="main-dropdown-item flex align-items-center header-logout">
          <i class="iconfont icon-zhanghaoguanli user-menu-icon"></i> 账号管理
        </el-dropdown-item>
        <el-dropdown-item command="change-password" divided class="main-dropdown-item flex align-items-center header-logout">
          <i class="iconfont icon-xiugaimima user-menu-icon"></i> 修改密码
        </el-dropdown-item>
  
        <el-dropdown-item command="out" divided class="main-dropdown-item flex align-items-center header-logout">
          <i class="iconfont icon-ic_tiaozhuan user-menu-icon"></i> 退出账号
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  
  </el-header>
</template>

<script>
import storageServing from "../serving/storage.serving";
export default {
  data(){
    return {
      isManagement:true
    }
  },
  created() {
    const path = this.$route.path;
    if (path.includes("/main/")) {
      this.isManagement = false
    }
  },
  methods: {
    changeCommand(e) {
      if (e == "out") {
        storageServing.clear();
        this.$store.commit("setUserInfo", {});
        this.$router.push({ name: "login" });
      } else {
        this.toUrl(e);
      }
    },
    toUrl(path, params = {}) {
      this.$router.push({
        name: path,
        params: params
      });
    }
  },
  computed: {
    user() {
      return this.$store.state.user.user
    }
  }
};
</script>

<style lang="scss">
@import "../assets/css/var.scss";
.el-header {
  background-color: $primary;
  color: #fff;
  font-size: 14px;
  i {
    color: #fff;
  }
  .header-left {
    position: absolute;
    left: 20px;
    .header-logo {
      cursor: pointer;
      width: 140px;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    .header-menu-line {
      width: 0;
      height: 18px;
      border-left: 1px solid #fff;
      margin: 5px 0 0 13px;
    }
    .header-menu-text {
      // line-height: 41px;
      margin-left: 10px;
      margin-top: 5px;
    }
    .header-menu-icon {
      font-size: 12px;
      transform: rotate(-90deg);
      transition: transform 0.5s;
      cursor: pointer;
      &.is-fixed {
        transform: rotate(0deg);
      }
    }
  }
  .help {
    height: 20px;
    cursor: pointer;
    font-size: 14px;
    color: #fff;
    font-family: PingFang SC;
    padding: 0 15px;
    margin-top: 20px;
    line-height: 20px;
    margin-right: 15px;
    // border-left:1px solid rgba(255,255,255,0.6);
    border-right: 1px solid rgba(255, 255, 255, 0.6);
    i {
      margin-right: 5px;
    }
  }
  .header-menu {
    margin-right: 20px;
    .iconfont {
      font-size: 14px;
      cursor: pointer;
    }
    &.line {
      height: 15px;
      border-left: 1px solid rgba(255, 255, 255, 0.4849);
    }
    &.menu-a {
      text-decoration: none !important;
      cursor: pointer;
      color: #fff;
      i {
        font-size: 18px;
      }
    }
    &.menu-btn {
      width: 72px;
      height: 28px;
      border: 1px solid #fff;
      border-radius: 5px;
      text-align: center;
      line-height: 28px;
      cursor: pointer;
    }
    &.logout {
      cursor: pointer;
    }
  }
}

.content {
  margin-bottom: 20px;
}

.el-aside {
  // color: #333;
}

.fa {
  margin-top: -3px;
  margin-right: 5px;
}

.dropdown {
  margin-right: 20px;
  .el-dropdown-link {
    cursor: pointer;
  }
  span {
    color: #fff;
  }
}

.user-menu-icon {
  font-size: 18px;
  margin-right: 6px;
}

.header-logout {
  &:before {
    margin: 0;
  }
}

.main-body {
  position: relative;
  &.isHidden {
    overflow: hidden;
  }
}
</style>


