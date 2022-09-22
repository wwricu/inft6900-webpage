import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './route/index'
import axios from "axios"
import {autoLogin} from "@/global";
import {changeLoginStatus} from "@/global";

Vue.prototype.$axios = axios
Vue.prototype.$autoLogin = autoLogin
Vue.prototype.$changeLoginStatus = changeLoginStatus

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
