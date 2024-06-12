import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Timesheet from '../views/Timesheet.vue';
import CurrentTimesheet from '../components/CurrentTimesheet.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import TimeSheet from '../views/TimeSheet.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/timesheet', name: 'Timesheet', component: Timesheet },
  { path: '/current-timesheet', name: 'Current Timesheet', component: CurrentTimesheet },
  { path: '/signin', name: 'SignIn', component: SignIn, meta: { hideSidebar: true }},
  { path: '/signup', name: 'SignUp', component: SignUp, meta: { hideSidebar: true }},
  { path: '/time-sheet', name: 'TimeSheet', component: TimeSheet },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
