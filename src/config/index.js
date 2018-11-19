
const base = "/v1/merculetManagement"

let urlBase
// 线上生产环境
if (process.env.NODE_EVENT == 'prod') {
  if (process.env.NODE_LANG == 'en') {
    // 线上生产环境 国外
    urlBase = "https://merculet-mgnt.merculet.io"
  } else {
    // 线上生产环境 国内
    urlBase = "https://mb-mgnt.magicwindow.cn"
  }
} else if (process.env.NODE_EVENT == 'preprod') {
  // 预生产
  if (process.env.NODE_LANG == 'en') {
    urlBase = "https://preprodmerculet-mgnt.merculet.io"
  } else {
    urlBase = "https://preprodmb-mgnt.magicwindow.cn"
  }

} else {
  // 测试版或者开发板
  if (process.env.NODE_LANG == 'en') {
    urlBase = "http://merculet-mgnt.liaoyantech.cn"
  } else {
    urlBase = "http://openplatform.liaoyantech.cn"
  }
}


export {
  base,
  urlBase,
}

