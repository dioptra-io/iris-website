import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from '../views/Admin.vue'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
import MeasurementDetails from '../views/MeasurementDetails.vue'
import MeasurementsExhaustive from '../views/MeasurementsExhaustive.vue'
import MeasurementsZeph from '../views/MeasurementsZeph.vue'
import MeasurementsMine from '../views/MeasurementsMine.vue'
import NewMeasurement from '../views/NewMeasurement.vue'
import PageNotFound from '../views/404.vue'
import Register from '../views/Register.vue'
import Profile from '../views/Profile.vue'
import SQL from '../views/SQL.vue'

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
    path: '/measurements/exhaustive',
    name: 'MeasurementsExhaustive',
    component: MeasurementsExhaustive,
  },
  {
    path: '/measurements/zeph',
    name: 'MeasurementsZeph',
    component: MeasurementsZeph,
  },
  {
    path: '/measurements/mine',
    name: 'MeasurementsMine',
    component: MeasurementsMine,
  },
  {
    path: '/measurements/:series/:uuid',
    name: 'MeasurementDetails',
    component: MeasurementDetails,
  },
  {
    path: '/sql/:series/:measurementUUID/:agentUUID',
    name: 'SQL',
    component: SQL,
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
