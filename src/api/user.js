
import http from '../serving/http.serving'

const userApi =  {
    // 登陆接口
    login: params => http.httpPost(`/api/admin/user/login`, params),
}
export default userApi


