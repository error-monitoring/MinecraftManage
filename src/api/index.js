
import http from '../serving/http.serving'

 const indexApi = {
    // 注册短信验证码接口
    smsVerifyCode: params => http.httpPost(`/v1/openplatform/register/smsVerifyCode`, params),
    // 获取图形验证码
    imgVerifyCode: () => http.httpPost(`/v1/openplatform/register/imgVerifyCode`),
    // 根据token获取七牛云的配置信息
    preupload: params => http.httpGet(`/v1/openplatform/resource/preupload`, params),
    // 忘记密码发短信接口
    sendSms: params => http.httpPost(`/v1/openplatform/forgetPassword/sendSms`, params),
}

export default indexApi
