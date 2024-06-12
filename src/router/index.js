import { createRouter, createWebHistory } from 'vue-router';
// import Home from '../views/Home.vue';
import Dashboard from '../views/Dashboard.vue';
import Timesheet from '../views/Timesheet.vue';
import CurrentTimesheet from '../components/CurrentTimesheet.vue';

const routes = [
//   { path: '/', name: 'Home', component: Home },
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/timesheet', name: 'Timesheet', component: Timesheet },
  { path: '/current-timesheet', name: 'Current Timesheet', component: CurrentTimesheet },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
