let baseApi = ''

if(process.env.VUE_APP_EVENT == 'dev'){
    baseApi = 'http://47.98.132.24:7100'
}else{
    baseApi = ''
}


export {
  urlBase,
}

