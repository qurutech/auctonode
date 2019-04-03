import Vue from 'vue';
import Toasted from 'vue-toasted';
import App from './App.vue';
import { router } from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Toasted, {
  iconPack: 'fontawesome',
  theme: 'bubble',
  closeOnSwipe: true,
  singleton: true,
  duration: 8000
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
