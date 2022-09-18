import Vue from 'vue'
import { reactive } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './route/index'
import axios from "axios"

Vue.prototype.axios = axios
Vue.config.productionTip = false

export const store = reactive({
  loginStatus: false,
  role: '',
  permission: 0,
  name: [],
  roles: [
    'User',
    'Student',
    'Staff',
    'Admin'
  ],
  AVN: 'WW'
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
