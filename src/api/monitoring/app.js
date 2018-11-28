
import http from '@/serving/http.serving'

export default {

    // 应用管理列表
    list: params => http.httpGet(`/api/monitoring/monitoring-app/list`, params),

    // 应用管理列表
    detail: params => http.httpGet(`/api/monitoring/monitoring-app/detail`, params),

    // 创建
    create: params => http.httpPost(`/api/monitoring/monitoring-app/create`, params),

    // 修改
    update: params => http.httpPost(`/api/monitoring/monitoring-app/update`, params),
    
}
