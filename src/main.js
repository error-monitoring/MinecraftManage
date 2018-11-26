import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './serving'
import "@/assets/less/index.scss"
import ElementUI from 'element-ui'


Vue.config.productionTip = false


Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


