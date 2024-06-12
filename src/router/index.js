import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import SignIn from '../views/SignIn.vue';
import SignUp from '../views/SignUp.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: Dashboard },
  { path: '/signin', name: 'SignIn', component: SignIn, mete: {name: 'signin', layout: 'AuthLayout'}},
  { path: '/signup', name: 'SignUp', component: SignUp, mete: {name: 'signup', layout: 'AuthLayout'}},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
