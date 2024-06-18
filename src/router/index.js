import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Timesheet from '../views/TimeSheet.vue';
import CurrentTimesheet from '../components/CurrentTimesheet.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import TimeTable from '../components/TimeTable.vue';

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { path: '/' }},
  { path: '/timesheet', name: 'Timesheet', component: Timesheet, meta: { path: '/timesheet' }},
  { path: '/current-timesheet', name: 'Current Timesheet', component: CurrentTimesheet, meta: { path: '/current-timesheet' }},
  { path: '/sign-in', name: 'SignIn', component: SignIn, meta: { hideSidebar: true }},
  { path: '/signup', name: 'SignUp', component: SignUp, meta: { hideSidebar: true }},
  { path: '/time-sheet', name: 'TimeSheet', component: TimeTable, meta: { path: '/time-sheet' }},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

// router.beforeEach((to, from, next) => {
//   if (to.path === '/sign-in' && isAuthenticated()) {
//     next('/dashboard');
//   } else {
//     next('/sign-in');
//   }
// });



export default router;
