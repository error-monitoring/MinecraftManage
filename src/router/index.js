/*
 * @Author: wenquan.huang
 * @Date: 2018-12-17 14:40:34
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-17 17:23:28
 */
/* eslint-disable */

import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history", // 设置地址栏模式 默认是hash
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/home",
      component: () => import("../components/home-main.vue"),
      children: [
        {
          path: "/change-password",
          name: "change-password",
          component: () =>
            import("../views/change-password/change-password.vue"),
          meta: {
            title: "修改密码",
            isLogin: true
          }
        },
        {
          path: "/502",
          name: "502",
          component: () => import("../views/error/502.vue"),
          meta: {
            title: "Mercuelt-Minecraft"
          }
        }
      ]
    },
    {
      path: "/",
      name: "login",
      component: () => import("../views/login/index.vue"),
      meta: {
        title: "登录"
      }
    },

    {
      path: "/main",
      component: () => import("../components/main.vue"),
      children: [
        {
          path: "monitoring/app-list",
          name: "monitoring-app-list",
          component: () => import("../views/main/monitoring/app/app-list.vue"),
          meta: {
            title: "应用列表",
            isLogin: true
          }
        },

        {
          path: "monitoring/aggregate-list",
          name: "monitoring-aggregate-list",
          component: () =>
            import("../views/main/monitoring/error/aggregate-list.vue"),
          meta: {
            title: "聚合列表",
            isLogin: true
          }
        },
        {
          path: "monitoring/error-list/:md5?",
          name: "monitoring-error-list",
          component: () =>
            import("../views/main/monitoring/error/error-list.vue"),
          meta: {
            title: "错误列表",
            isLogin: true
          }
        },

        {
          path: "monitoring/error-info/:id",
          name: "monitoring-error-info",
          component: () =>
            import("../views/main/monitoring/error/error-info.vue"),
          meta: {
            title: "错误详情",
            isLogin: true
          }
        },
        {
          path: "data-report",
          name: "data-report",
          component: () => import("../views/main/data-report/data-report.vue"),
          meta: {
            title: "数据报告",
            isLogin: true
          }
        }
      ]
    },
    {
      path: "*",
      component: () => import("../components/home-main.vue"),
      children: [
        {
          path: "",
          name: "404",
          component: () => import("../views/error/404.vue"),
          meta: {
            title: "Mercuelt-开发平台"
          }
        }
      ]
    }
  ]
});

export default router;
