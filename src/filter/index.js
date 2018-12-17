/*
 * @Author: wenquan.huang
 * @Date: 2018-12-17 11:49:09
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-17 11:51:46
 */

import Vue from "vue";

import filters from "./filter";

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
