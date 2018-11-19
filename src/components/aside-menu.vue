<!--文全-->

<template>
	<el-aside id="gaas-aside" width="auto"
        @mouseover.native="menuMouseOver"
        @mouseout.native="menuMouseOut">
		<el-menu
            id="gaas-menu"
            :default-active="defaultActive"
            unique-opened
            router
            @select="selectMenu"
            :collapse="isCollapse&&!isFixed">
            <template v-for="(item,index) in menuItem">
                <!-- <el-submenu :key="index" v-if="item.children&&item.children.length>0&&item.childrenShow" :index="toUrl(index)">
                    
                    <template slot="title">
                        <i class="icon iconfont menu-item-icon" :class="toIcon(item.icon)"></i>
                        <span>{{item.name}}</span>
                        <div class="active-point"></div>
                    </template>
                    <el-menu-item v-for=" (i,index1) in item.children" :key='index1' :class="{'is-active':i.url == defaultActive}" :index="toUrl(i.url)">
                        <span slot="title">{{i.name}}</span>
                    </el-menu-item>
                </el-submenu> -->

                <el-menu-item :key="index" v-if="!item.childrenShow && item.url"  :index="toUrl(item.url)" :class="{'is-active':item.url == defaultActive}">
                    <i class="icon iconfont menu-item-icon" :class="item.icon"></i>
                    <span slot="title">{{item.name}}</span>
                    <div class="active-point"></div>
                </el-menu-item>

            </template>
		</el-menu>

	</el-aside>
</template>

<script>
export default {
  name: "aside-menu",
  props: {
    isFixed: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  data() {
    return {
      account_id: 1,
      defaultActive: "",
      options: [
        {
          name: "",
          id: "all"
        }
      ],
      isCollapse: true,
      mouseStatus: "out"
    };
  },
  created() {
    this.defaultActive = this.$route.path;
  },
  computed: {
    menuItem() {
      let data = [
        {
          id: 2,
          name: "应用管理",
          permissionType: 0,
          url: "/main/app-list",
          icon: "icon-caidanlanyingyongguanli",
          childrenShow: false
        },
        {
          id: 2,
          name: "数据报告",
          permissionType: 0,
          url: "/main/data-report",
          icon: "icon-caidanlanshujubaobiao",
          childrenShow: false
        }
      ];
      return data;
    }
  },
  methods: {
    toIcon(icon) {
      return icon == null ? "icon-yingyong" : icon;
    },
    toUrl(url) {
      if (url == null) {
        return "/main";
      }
      return url.toString();
    },
    toStr(str) {
      return str.toString();
    },
    selectMenu(index, indexPath, component) {
      // this.defaultActive = this.$route.path;
      // console.log(this.$route)
    },
    menuMouseOver() {
      if (!this.isFixed) {
        this.isCollapse = false;
        this.mouseStatus = "over";
      }
    },
    menuMouseOut() {
      if (!this.isFixed) {
        // this.mouseStatus  防止鼠标移出一秒以内再次移入 菜单栏继续收起
        this.mouseStatus = "out";
        let timer = setTimeout(() => {
          clearTimeout(timer);
          if (this.mouseStatus === "out") {
            this.isCollapse = true;
          }
        }, 1000);
      }
    }
  },
  watch:{
    $route(o,l){
      this.defaultActive = o.path
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/var.scss";
#gaas-aside {
  background-color: #fff;
  box-shadow: 5px 2px 6px 0px rgba(238, 240, 243, 1);

  #gaas-menu {
    border-right: none;
    &:not(.el-menu--collapse) {
      width: 250px;
      .menu-item-icon {
        margin-right: 6px;
      }
      .el-menu-item {
        &.is-active {
          color: $primary !important;
          background-color: $bg-table-hover !important;
        }
        &:hover {
          color: $primary !important;
          .menu-item-icon {
            color: $primary !important;
          }
        }
        &.back-index {
          width: 210px;
          height: 36px;
          line-height: 34px;
          border: 1px solid $border;
          border-radius: 4px;
          text-align: center;
          margin: 20px auto;
          padding: 0 !important;
          font-size: 12px;
          &:hover {
            background-color: transparent;
            color: $primary !important;
            border-color: $primary !important;
          }
          .menu-item-icon {
            margin-right: 0;
            font-size: 12px;
          }
        }
      }
      .el-submenu {
        .el-menu-item {
          padding-left: 80px !important;
        }
        &.is-active {
          .menu-item-icon {
            color: $color-title !important;
          }
        }
      }
    }
    &.el-menu--collapse {
      .el-menu-item,
      .el-submenu {
        &.is-active {
          .menu-item-icon {
            color: $color-title !important;
          }
          .active-point {
            display: block;
          }
        }
      }
    }
    .el-menu-item,
    .el-submenu {
      position: relative;
      font-size: 14px;
      color: $color-not-matter;
      .menu-item-icon {
        font-size: 18px;
        width: 24px;
        text-align: center;
        display: inline-block;
        line-height: 1;
      }
      .active-point {
        display: none;
        width: 4px;
        height: 4px;
        position: absolute;
        top: 26px;
        right: 8px;
        background-color: $primary;
        border-radius: 50%;
      }
    }
  }
}
</style>
