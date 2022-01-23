import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/css/iconfont.css'
import './assets/css/index.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { popover, button } from 'element-ui'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(popover)
Vue.use(button)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
