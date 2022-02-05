import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './main.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(new VueSocketIO({
  debug: false,
  connection: 'ws://127.0.0.1:8081',
  vuex: {
    store,
    actionPrefix: 'socket_'
  }
}));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')