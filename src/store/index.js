/**
 * User: sheyude
 * Time: 上午 10:11
 *
 */

// 状态管理
import Vue from 'vue'
import Vuex from 'vuex'

// import leftMenu from './leftMenu'
// import lang from './lang'
import user from './user'
import storage from '../serving/storage.serving'
// import simplet from './simplet'
Vue.use(Vuex);


/**
 * 同步保存vuex 到缓存
 * @param {*} store 
 */
const myPlugin = store => {
    store.subscribe((mutation, state) => {
        Object.keys(state).forEach((item) => {
            storage.set(state[item],item)
        })
    })
}

// 定义一个容器
let store = new Vuex.Store({
    modules:{
        // 接收各种模块
        user
        // leftMenu,
        // lang,
        // test,
        // simplet
    },
    plugins: [myPlugin]
});


export default store