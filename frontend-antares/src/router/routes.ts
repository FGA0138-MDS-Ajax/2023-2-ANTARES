import { RouteRecordRaw } from 'vue-router';
import { useSessionStore } from 'src/stores/session';
import { computed } from 'vue'

const verificaLogin = () => {
  const sessionStore = useSessionStore();
  const sessionData = computed(() => sessionStore.getSessionData) as any
  if( sessionData == undefined || sessionData.value.matricula === undefined) {
    return false
  } else {
    return true
  }
}

const routes: RouteRecordRaw[] = [
  {
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
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { name:'feed', path: '', component: () => import('pages/FeedPage.vue') },
      { name:'publicar-vagas', path: '/publicar-vagas', component: () => import('pages/PublicarVagasPage.vue') },
      { name:'feed-2', path: '/feed', component: () => import('pages/FeedPage.vue') },
      { name:'admin', path: '/admin', component: () => import('pages/IndexPage.vue') },
      { name:'cardapio', path: '/cardapio', component: () => import('pages/CardapioRuPage.vue') },
      { name:'configurações', path: '/configuracoes', component: () => import('pages/ConfiguracoesPage.vue') },
      { name:'publicar-avaliacao', path: '/publicar-avaliacao/:codigo', component: () => import('pages/PublicarAvaliacaoPage.vue') },
      { name:'disciplinas', path: '/disciplinas', component: () => import('pages/DisciplinasPage.vue') },
      { name:'disciplina-codigo', path: '/disciplina/:codigo', component: () => import('pages/DisciplinaPage.vue') },
      { name:'calendario', path: '/calendario', component: () => import('src/pages/CalendarioPage.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;