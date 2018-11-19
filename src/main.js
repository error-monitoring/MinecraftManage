import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './serving'
import "@/assets/less/index.scss"
import ElementUI from 'element-ui'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'


Vue.config.productionTip = false


Vue.use(ElementUI)
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach((block) => {
      hljs.highlightBlock(block)
  })
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


