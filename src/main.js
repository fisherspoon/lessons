import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'

Vue.use(VueRouter)
Vue.use(Vuelidate)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
