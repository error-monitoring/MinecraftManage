let baseApi = ''

if(process.env.VUE_APP_EVENT == 'test'){
    baseApi = 'http://47.98.132.24:7100'
}else{
    baseApi = ''
}


export {
  urlBase,
}

