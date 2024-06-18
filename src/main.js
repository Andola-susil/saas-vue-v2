import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/styles/tailwind.css';
import './assets/styles/tabulator.css';
import '../node_modules/tabulator-tables/dist/css/tabulator_bootstrap5.min.css';


createApp(App).use(router).mount('#app');
