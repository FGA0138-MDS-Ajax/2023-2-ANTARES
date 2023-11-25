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
      { name:'app', path: '', component: () => import('pages/IndexPage.vue') },
      { name:'publicar-vagas', path: '/publicar-vagas', component: () => import('pages/PublicarVagasPage.vue') },
      { name:'feed-vagas', path: '/feed', component: () => import('pages/FeedPage.vue') },
      { name:'avaliar-disciplina',path: '/avaliar-disciplina', component: () => import('pages/AvaliarDisciplinaPage.vue') },
      { name:'controle-faltas',path: '/controle-faltas', component: () => import('pages/ControleFaltasPage.vue') },
      { name:'calendario-academico',path: '/calendario-academico', component: () => import('pages/CalendarioAcademicoPage.vue') },
      { name:'cardapio-ru',path: '/cardapio-ru', component: () => import('pages/CardapioRuPage.vue') },
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
