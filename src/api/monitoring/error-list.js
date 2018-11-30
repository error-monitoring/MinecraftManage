
import http from '@/serving/http.serving'

export default {

    // 应用管理列表
    list: params => http.httpGet(`/api/monitoring/listrn-error/list`, params),
    
    info: params => http.httpGet(`/api/monitoring/listrn-error/details`, params),
}
