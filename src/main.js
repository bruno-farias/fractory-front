import '@babel/polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import './plugins/vuetify'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

import router from './router/index'
import store from './store/store'

Vue.use(VueAxios, axios, VueRouter, Vuex)

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://localhost/api/';

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
