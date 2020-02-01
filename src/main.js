import Vue from 'vue';
import Toasted from 'vue-toasted';
import Vue2Filters from 'vue2-filters';
import VueClipboard from 'vue-clipboard2'
import App from './App.vue';
import { router } from './router';
import store from './store';
import './registerServiceWorker';


Vue.config.productionTip = false;
Vue.use(Toasted, {
  iconPack: 'fontawesome',
  theme: 'bubble',
  closeOnSwipe: true,
  duration: 8000
});

Vue.use(Vue2Filters);
Vue.use(VueClipboard);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
