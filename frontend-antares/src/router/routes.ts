import { RouteRecordRaw } from 'vue-router';
import { useSessionStore } from 'src/stores/session';
import { computed } from 'vue'

const verificaLogin = () => {
  const sessionStore = useSessionStore();
  const sessionData = computed(() => sessionStore.getSessionData) as any
  if(sessionData.value.login === undefined) {
    return false
  } else {
    return true
  }
}
import { useSessionStore } from 'src/stores/session';
import { computed } from 'vue'

const verificaLogin = () => {
  const sessionStore = useSessionStore();
  const sessionData = computed(() => sessionStore.getSessionData) as any
  if(sessionData.value.login === undefined) {
    return false
  } else {
    return true
  }
}

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    name: 'login',
    path: '/',
    beforeEnter: (to, from, next) => {
      const isAuthenticated = verificaLogin();
      if (!isAuthenticated) {
        next();
      } else {
        next('/app'); 
      }
    },
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    name: 'app',
    path: '/app',
    beforeEnter: (to, from, next) => {
      const isAuthenticated = verificaLogin();
      if (isAuthenticated) {
        next();
      } else {
        next('/'); 
      }
    },
    beforeEnter: (to, from, next) => {
      const isAuthenticated = verificaLogin();
      if (!isAuthenticated) {
        next();
      } else {
        next('/home'); 
      }
    },
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    name: 'home',
    path: '/home',
    beforeEnter: (to, from, next) => {
      const isAuthenticated = verificaLogin();
      if (isAuthenticated) {
        next();
      } else {
        next('/'); 
      }
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name:'app', path: '', component: () => import('pages/IndexPage.vue') },
      { name:'publicar-vagas', path: '/publicar-vagas', component: () => import('pages/PublicarVagasPage.vue') },
      
    ],
  },
    children: [{ name:'index', path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    name: 'feed',
    path:  '/feed',
    component: () => import('layouts/FeedLayout.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;