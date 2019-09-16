import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import dlgModel3d from './components/dlgModel3d'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    }
  ]
})
