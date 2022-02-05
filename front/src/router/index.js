import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Calendar from "../views/Calendar";
import Authentication from "../views/Authentication";
import Appointments from "../views/Appointments";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments,
    props: true
  },
  {
    path: '/login',
    name: 'Login',
    component: Authentication,
  },
  {
    path: '/register',
    name: 'Register',
    component: Authentication,
    props: {
      isRegister: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
