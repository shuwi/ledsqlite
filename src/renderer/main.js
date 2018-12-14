import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import AppDAO from './store/db'
import WorkersRepository from './repositories/workersRepository'

const dao = new AppDAO('idcard.db')
const workersRepo = new WorkersRepository(dao)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.workersRepo = Vue.prototype.$workersRepo = workersRepo
Vue.config.productionTip = false
Vue.use(iView)

new Vue({
  components: {
    App
  },
  router,
  template: '<App/>',
  store
}).$mount('#app')