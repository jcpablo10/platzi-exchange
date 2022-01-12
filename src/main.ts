import Vue from 'vue';
/* Filters */
import '@/filters/filters';
/* Componenets */
import { VueSpinners } from '@saeris/vue-spinners';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@/assets/css/tailwind.css';
import App from './App.vue';

Vue.use(VueSpinners);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
