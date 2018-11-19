
import http from '../serving/http.serving'

export default {

    // 添加应用
    add: params => http.httpPost(`/v1/openplatform/dapp/add`, params),
    // 编辑应用
    edit: params => http.httpPost(`/v1/openplatform/dapp/edit`, params),
    // 删除应用
    delete: params => http.httpPost(`/v1/openplatform/dapp/delete`, params),
    // 应用管理列表
    list: params => http.httpGet(`/v1/openplatform/dapp/list`, params),
    // 应用信息
    info: params => http.httpGet(`/v1/openplatform/dapp/info`, params),
    // 应用申请上线状态
    updateStatus: params => http.httpPost(`/v1/openplatform/dapp/updateStatus`, params),
    // 修改应用回调地址
    updateBackUrl: params => http.httpPost(`/v1/openplatform/dapp/updateBackUrl`, params),
    
}
