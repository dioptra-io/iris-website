import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '../views/Admin.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Measurements from '../views/Measurements.vue'
import MeasurementDetails from '../views/MeasurementDetails.vue'
import NewMeasurement from '../views/NewMeasurement.vue'
import PageNotFound from '../views/404.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/measurements/:visibility',
    name: 'Measurements',
    component: Measurements,
  },
  {
    path: '/measurements/:visibility/:uuid',
    name: 'MeasurementDetails',
    component: MeasurementDetails,
  },
  {
    path: '/new',
    name: 'NewMeasurement',
    component: NewMeasurement,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFound,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/index', '/login', '/register', '/offcanvas', '/404'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (!to.matched.length) {
    next('/404');
  }

  if (authRequired && !loggedIn) {
    next('/404');
  } else {
    next();
  }
});

export default router
