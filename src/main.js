import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './route/index'
import axios from "axios"
import { syncAutoLogin, waitForLogin} from "@/global";
import {changeLoginStatus} from "@/global";

axios.defaults.withCredentials = true;
Vue.prototype.$axios = axios
Vue.prototype.$autoLogin = syncAutoLogin//autoLogin
Vue.prototype.$changeLoginStatus = changeLoginStatus
Vue.prototype.$waitForLogin = waitForLogin

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
