import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Order from '../components/Order/Order.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: 'Login', component: Login },
    { path: '/order', name: 'Order', component: Order }
  ],
  mode: 'history'
})

export default router