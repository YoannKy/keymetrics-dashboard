import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';
import router from './router';
import store from './store/store';
import VueRx from 'vue-rx';
import Highcharts from 'highcharts';

// @ts-ignore
import HighchartsVue from 'highcharts-vue';
import loadTreeMap from 'highcharts/modules/treemap.js';
import loadHighchartsMore from 'highcharts/highcharts-more.js';



Vue.use(VueRx);
loadHighchartsMore(Highcharts);
loadTreeMap(Highcharts);
Vue.use(HighchartsVue, { Highcharts });
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
