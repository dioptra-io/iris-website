import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import Measurements from '../views/Measurements.vue'
import MeasurementOverview from '../views/MeasurementOverview.vue'
import NewMeasurement from '../views/NewMeasurement.vue'
import PageNotFound from '../views/404.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/measurements',
    name: 'Measurements',
    component: Measurements,
  },
  {
    path: '/measurements/:uuid',
    name: 'MeasurementOverview',
    component: MeasurementOverview
  },
  {
    path: '/new',
    name: 'NewMeasurement',
    component: NewMeasurement,
  },
  {
    path: '/profile',
    name: 'User',
    component: User
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFound
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/index', '/login', '/register', '/404'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next('/404');
  } else {
    next();
  }
});

export default router
