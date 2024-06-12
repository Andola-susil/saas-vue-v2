import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Timesheet from '../views/Timesheet.vue';
import CurrentTimesheet from '../components/CurrentTimesheet.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/timesheet', name: 'Timesheet', component: Timesheet },
  { path: '/current-timesheet', name: 'Current Timesheet', component: CurrentTimesheet },
  { path: '/signin', name: 'SignIn', component: SignIn, mete: {name: 'signin', layout: 'AuthLayout'}},
  { path: '/signup', name: 'SignUp', component: SignUp, mete: {name: 'signup', layout: 'AuthLayout'}},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
