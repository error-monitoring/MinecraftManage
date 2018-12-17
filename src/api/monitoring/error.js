
import http from '@/serving/http.serving'

export default {

    // 聚合错误列表
    aggregateErrorList: params => http.httpGet(`/api/monitoring/aggregate-error/list`, params),

    errorList: params => http.httpGet(`/api/monitoring/error/list`, params),
    
    info: params => http.httpGet(`/api/monitoring/listrn-error/details`, params),
}
