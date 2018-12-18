/*
 * @Author: wenquan.huang
 * @Date: 2018-12-17 15:29:40
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-17 22:16:39
 */

import Vue from "vue";
import storage from "./storage.serving";
import monitoringApp from "../api/monitoring/app";
import monitoringError from "../api/monitoring/error";

const freeze = obj => {
  Object.freeze(obj);

  if (obj instanceof Array) {
    obj.forEach(item => {
      if (typeof item === "object") {
        freeze(item);
      }
    });
  } else if (obj instanceof Object) {
    Object.values(obj).forEach(item => {
      if (typeof item === "object") {
        freeze(item);
      }
    });
  }
};

const toJson = (data) => {
  Object.keys(data).forEach(item => {       
    try {
      data[item] = JSON.parse(data[item])
    } catch (error) {
      data[item] = data[item]
    }

  })
}

let Utils = {
  freeze,
  toJson,
  storage,
  monitoringApp,
  monitoringError
};

Vue.use({
  install(Vue) {
    Object.keys(Utils).forEach(item => {
      Vue.prototype[`$${item}`] = Utils[item];
    });
  }
});
