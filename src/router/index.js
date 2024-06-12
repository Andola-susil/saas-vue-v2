import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
// import Timesheet from '../views/Timesheet.vue';

const routes = [
//   { path: '/', name: 'Home', component: Home },
  { path: '/', name: 'Dashboard', component: Dashboard },
//   { path: '/timesheet', name: 'Timesheet', component: Timesheet },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
