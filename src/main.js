import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Import Bootstrap and BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Import BootstrapVue
import BootstrapVue from 'bootstrap-vue';

// Configure Vue.js
Vue.config.productionTip = false;

// Use BootstrapVue throughout the project
Vue.use(BootstrapVue);

// Initialize Vue instance with router and render the main App component
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
