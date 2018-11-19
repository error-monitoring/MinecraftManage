
import http from '../serving/http.serving'

const userApi =  {
    // 发送绑定simplet短信验证码
    smsVerifyCode: params => http.httpPost(`/v1/openplatform/user/bindSimplet/smsVerifyCode`, params),
    // 根据token查询用户个人信息(注册时用)
    getCertificationInfo: () => http.httpGet(`/v1/openplatform/certification/getCertificationInfo`),
    // 绑定simplet账号
    bindSimplet: params => http.httpPost(`/v1/openplatform/user/bindSimplet`, params),
    // 根据token查询用户个人信息
    userInfo: () => http.httpGet(`/v1/openplatform/user/info`),
    //  修改密码
    updatePassword: params => http.httpPost(`/v1/openplatform/updatePassword`, params),
    //忘记密码
    forgetPassword: params => http.httpPost(`/v1/openplatform/forgetPassword`, params),
    // 注册接口
    register: params => http.httpPost(`/v1/openplatform/register`, params),
    // 个人认证接口
    personal: params => http.httpPost(`/v1/openplatform/certification/personal`, params),
    // 登陆接口
    login: params => http.httpPost(`/v1/openplatform/login`, params),
    // 企业认证
    company: params => http.httpPost(`/v1/openplatform/certification/company`, params),
}
export default userApi


