import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Market from '@/components/Market'
import ProductDetail from '@/components/ProductDetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/market',
      name: 'Market',
      component: Market
    },
    {
      path: '/market/:id',
      name: 'ProductDetail',
      component: ProductDetail
    },
  ]
})
