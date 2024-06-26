import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/styles/tailwind.css';
import './assets/styles/tabulator.css';
import './assets/styles/font-awesome-all.css';
import '../node_modules/tabulator-tables/dist/css/tabulator_bootstrap5.min.css';
import moment from 'moment';
import { createPinia } from 'pinia'
// import 'vue-multiselect/dist/vue-multiselect.min.css';

const app = createApp(App);

// Make moment globally available through Vue's prototype
app.config.globalProperties.$moment = moment;

app.use(router).use(createPinia()).mount('#app');
// createApp(App).use(router).use(createPinia()).mount('#app');
