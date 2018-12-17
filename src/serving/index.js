/*
 * @Author: wenquan.huang 
 * @Date: 2018-12-17 15:29:40 
 * @Last Modified by: wq599263163@163.com
 * @Last Modified time: 2018-12-17 15:36:15
 */


import Vue from 'vue'
import storage from './storage.serving'
import monitoringApp from '../api/monitoring/app'
import monitoringError from '../api/monitoring/error'


let Utils = {
  storage,
  monitoringApp,
  monitoringError
};

Vue.use({
    install(Vue){
        Object.keys(Utils).forEach( item => {
            Vue.prototype[`$${item}`] = Utils[item]
        } )
    }
})
