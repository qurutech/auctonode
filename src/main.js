import Vue from 'vue';
import Toasted from 'vue-toasted';
import VueFilter from 'vue-filter';
import Vue2Filters from 'vue2-filters';
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

Vue.use(VueFilter);

Vue.use(Vue2Filters);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
