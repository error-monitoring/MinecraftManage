/* eslint-disable */
/**
 * author 文全
 */
import Vue from 'vue'
import Router from 'vue-router'
import storage from '../serving/storage.serving'

Vue.use(Router)

const router = new Router({
  mode: 'history',  // 设置地址栏模式 默认是hash
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/home',
      component: () => import('../components/home-main.vue'),
      children: [        
        {
          path: '/change-password',
          name: 'change-password',
          component: () => import('../views/change-password/change-password.vue'),
          meta: {
            title: '修改密码',
            isLogin:true
          }
        },
        {
          path: '/502',
          name: '502',
          component: () => import('../views/error/502.vue'),
          meta: {
            title: 'Mercuelt-Minecraft'
          }
        },
      ]
    },
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/index.vue'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/main',
      component: () => import('../components/main.vue'),
      children: [
        {
          path: 'monitoring/app-list',
          name: 'monitoring-app-list',
          component: () => import('../views/main/monitoring/app-list/app-list.vue'),
          meta: {
            title: '应用列表',
            isLogin:true
          }
        },
        {
          path: 'monitoring/error-list',
          name: 'monitoring-error-list',
          component: () => import('../views/main/monitoring/error-list/error-list.vue'),
          meta: {
            title: '错误列表',
            isLogin:true
          }
        },
        {
          path:'monitoring-app-info/:id',
          name:'monitoring-app-info',
          component: () => import('../views/main/monitoring/app-list/app-info.vue'),
          meta: {
            title: '应用详情',
            isLogin:true
          }
        },
        {
          path:'data-report',
          name:'data-report',
          component: () => import('../views/main/data-report/data-report.vue'),
          meta: {
            title: '数据报告',
            isLogin:true
          }
        }
      ]
    },
    {
      path: '*',
      component: () => import('../components/home-main.vue'),
      children: [
        {
          path: '',
          name: '404',
          component: () => import('../views/error/404.vue'),
          meta: {
            title: 'Mercuelt-开发平台'
          }
        }
      ]
    },
  ]
})

// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title
//   if(to.meta.isLogin){
//     const token = storage.get('token')
//     if(!token){
//       next('/502')
//     }else{
//       next()
//     }

//   }else{
//     next()
//   }
  
// })

export default router;
