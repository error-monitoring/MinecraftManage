
import http from '@/serving/http.serving'

export default {

    // 聚合错误列表
    aggregateErrorList: params => http.httpGet(`/api/monitoring/aggregate-error/list`, params),
    // 错误列表
    errorList: params => http.httpGet(`/api/monitoring/error/list`, params),
    // 错误详情
    getDateils: params => http.httpGet(`/api/monitoring/error/details`, params),
    // 获取sourcemap
    sourcemap: params => http.httpGet(`/api/monitoring/error/sourcemap`, params),
}
