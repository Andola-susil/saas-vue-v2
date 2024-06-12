// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './assets/styles/tailwind.css';

createApp(App).use(router).mount('#app');
