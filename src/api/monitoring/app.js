
import http from '@/serving/http.serving'

export default {

    // 应用管理列表
    list: params => http.httpGet(`/api/monitoring/monitoring-app/list`, params),

    // 创建
    create: params => http.httpPost(`/api/monitoring/monitoring-app/create`, params),
    
}
