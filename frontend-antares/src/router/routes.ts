import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    name: 'login',
    path: '/',
    component: () => import('layouts/LoginLayout.vue'),
  },
  {
    name: 'home',
    path: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ name:'index', path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
