import Vue from 'vue';
import App from './App.vue';
import store from './store/';
import VueSlider from 'vue-slider-component';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/black-green-dark.css';
import './scss/main.scss';

Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.component('VueSlider', VueSlider);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
