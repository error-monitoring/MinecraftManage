import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './serving'
import './filter'
import "@/assets/less/index.scss"
import dateFilter from './filter/filter'
import ElementUI from 'element-ui'


Vue.config.productionTip = false

// 代码高亮指令
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})



Vue.use(ElementUI)
Vue.use(dateFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


