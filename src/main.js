/******************************************
  2022 Trimester 3 INFT6900 Final Project
  Team   : Four Square
  Author : Weiran Wang
  Date   : 18/09/2022
******************************************/

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './route/index'
import axios from "axios"
import { syncAutoLogin, waitForLogin} from "@/global";
import {changeLoginStatus} from "@/global";

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios
Vue.prototype.$autoLogin = syncAutoLogin // autoLogin
Vue.prototype.$changeLoginStatus = changeLoginStatus
Vue.prototype.$waitForLogin = waitForLogin

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
