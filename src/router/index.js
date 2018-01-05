import Vue from 'vue'
import Router from 'vue-router'
import Notice from '@/pages/notice'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Notice
    }, {
      path: '/notice',
      name: 'Notice',
      component: Notice
    }
  ]
})
