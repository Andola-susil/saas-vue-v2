import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import CurrentTimesheet from '../components/CurrentTimesheet.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';
import TimeTable from '../components/TimeTable.vue';
import TreeTable from '../components/tables/TreeTable.vue';
import ApprovalRequests from '../views/ApprovalRequests.vue';
import PastTimeSheet from '../views/PastTimeSheet.vue';
import Reports from '../views/Reports.vue';
import CalenderView from '../views/CalenderView.vue';
import Resource from '../components/tables/ResourceView.vue';
import Settings from '../components/tables/SettingsView.vue';
import CreateResource from '../views/Resource/CreateResource.vue';

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { path: '/' }},
  // { path: '/timesheet', name: 'Timesheet', component: Timesheet, meta: { path: '/timesheet' }},
  { path: '/current-timesheet', name: 'Current Timesheet', component: CurrentTimesheet, meta: { path: '/current-timesheet' }},
  { path: '/sign-in', name: 'SignIn', component: SignIn, meta: { hideSidebar: true }},
  { path: '/signup', name: 'SignUp', component: SignUp, meta: { hideSidebar: true }},
  { path: '/time-sheet', name: 'TimeSheet', component: TimeTable,props: route => ({ id: route.query.id }), meta: { path: '/time-sheet' }},
  // { path: '/time-table', name: 'TimeTable', component: TimeTable, meta: { path: '/time-table' }},
  { path: '/time-sheet-approvals', name: 'Time-sheet approvals', component: ApprovalRequests, meta: { path: '/time-sheet-approvals' }},
  { path: '/past-time-sheet', name: 'Past Time-sheet', component: PastTimeSheet, meta: { path: '/past-time-sheet'}},
  { path: '/time-sheet-reports', name: 'Time-sheet Reports', component: Reports, meta: { path: '/time-sheet-reports'}},
  { path: '/calender-view', name: 'Calender', component: CalenderView, meta: { path: '/calender-view'}},
  
  //Settings
  { path: '/resource', name: 'Resource Management', component: Resource, meta: { path: '/resource'}},
  { path: '/time-sheet-rules', name: 'Timesheet Rules', component: Settings, meta: { path: '/time-sheet-rules'}},
  { path: '/create-resource', name: 'Create Resource', component: CreateResource, meta: { path: '/create-resource'}},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


const isAuthenticated = () => {
  return !!localStorage.getItem('accessToken');
};

router.beforeEach((to, from, next) => {
  if (isAuthenticated()) {
    // User is authenticated
    if (to.path === '/sign-in' || to.path === '/signup' || to.path === '/') {
      next('/dashboard');
    } else {
      next();
    }
  } else {
    // User is not authenticated
    if (to.path === '/sign-in' || to.path === '/signup') {
      next();
    } else {
      next('/sign-in');
    }
  }
});





export default router;
