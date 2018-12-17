/*
 * @Author: wenquan.huang
 * @Date: 2018-12-17 15:31:01
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-17 15:32:41
 */

/* eslint-disable */

import axios from "axios";

import { Message } from "element-ui";

import storage from "./storage.serving";
/**
 * 封装的全局ajax请求
 */
// http request 拦截器
axios.interceptors.request.use(
  config => {
    const token = storage.get("token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers["m-token"] = `${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(
  res => {
    return res;
  },
  err => {
    Message.error("服务器开了点小差！");

    return Promise.reject(err);
  }
);
class Http {
  constructor() {
    // axios.defaults.baseURL = url

    axios.defaults.timeout = 100000;
  }

  /**
   * GET 请求 {es6解构赋值}
   * @param type 包含url信息
   * @param data 需要发送的参数
   * @returns {Promise}
   * @constructor
   */
  async httpGet(url, params = {}) {
    try {
      let { data } = await axios.get(url, {
        params
      });
      return data;
    } catch (error) {}
  }


  /**
   * POST 请求
   * @param type Object 包含url信息
   * @param data Object 需要发送的参数
   * @returns {Promise}
   * @constructor
   */
  async httpPost(url, params = {}) {
    try {
      let { data } = await axios.post(url, params);
      return data;
    } catch (error) {
    }
  }
}
export default new Http();
