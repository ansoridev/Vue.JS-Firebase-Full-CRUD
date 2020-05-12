import firebase from 'firebase'
import VueFire from 'vuefire'
import Vue from 'vue'
import Router from 'vue-router'


import Home from '@/components/Home'
import Login from '@/components/Login'
import SignUp from '@/components/SignUp'
import Tables from '@/components/Tables'
import Files from '@/components/Files'
import ManageTable from '@/components/ManageTable'
import UpdateProfile from '@/components/UpdateProfile'

Vue.use(VueFire)
Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true
      },
      props: true
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/files',
      name: 'Files',
      component: Files,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manageTable/:id',
      name: 'ManageTable',
      component: ManageTable,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/updateProfile',
      name: 'UpdateProfile',
      component: UpdateProfile,
      meta: {
        requiresAuth: true
      }
    }
    
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  else if (!requiresAuth && currentUser) next('home');
  else next();
});

export default router;
