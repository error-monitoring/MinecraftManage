import storage from '../serving/storage.serving'

/**
 * 语言
 */

let state = storage.get('user') || {
    user:{
    }
}
export default {
    state,
    mutations: {
        setUserInfo(state, data) {
            state.user =data
        },
        // 登陆返回status：-2 审核失败 -1 未提交审核 0.审核中 1通过审核
        setUserStatus(state, data){
            state.status =data
        }
    },
    // actions: {
    //     changeLong(store, data) {
    //         store.commit("setLang", data)
    //     }
    // }
}
