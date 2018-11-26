let urlBase = ''

if(process.env.VUE_APP_EVENT == 'test'){
    urlBase = 'http://47.98.132.24:7100'
}else{
    urlBase = ''
}


export {
  urlBase,
}

