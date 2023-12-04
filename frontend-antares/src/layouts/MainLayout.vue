<template>
  <q-layout view="hHh lpR lfr">

    <q-header bordered class="bg-blue text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar class="q-mr-sm">
            <img src="~/assets/icon.png">
          </q-avatar>
          UnB na Mão
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-img class="absolute-top bg-blue"
        style="height: 140px"
      >
        <div class="row items-center justify-center bg-transparent">
          <q-avatar size="80px" class="q-mb-sm">
            <img style="border-bottom: 2px solid rgb(202, 202, 202)" :src="sessionData.user_image">
          </q-avatar>
          <div class="column q-pl-md">
            <div class="session-nome text-weight-bold w100">{{ obterPrimeiraUltimaPalavra(sessionData.nome) }}</div>
            <div class="low-opacity w100" style="font-size: 12px;">{{ sessionData.role }}</div>
          </div>
          <div class="low-opacity w100 text-center">@{{ sessionData.matricula }}</div>
        </div>
      </q-img>
    <!-- items do menu -->
    <q-scroll-area style="height: calc(100% - 140px); margin-top: 140px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item clickable v-ripple to="/admin">
          <q-item-section avatar>
            <q-icon name="admin_panel_settings" color="orange-10" />
          </q-item-section>

          <q-item-section style="color: rgb(255, 154, 39); font-weight: bold;">
            Admin Logs
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/feed">
          <q-item-section avatar>
            <q-icon name="dynamic_feed" />
          </q-item-section>

          <q-item-section>
            Feed
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/publicar-vagas">
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>
            Publicar
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple  to="/calendario">
          <q-item-section avatar>
            <q-icon name="event" />
          </q-item-section>

          <q-item-section>
            Calendário
          </q-item-section>
        </q-item>
        
        <q-item clickable v-ripple  to="/configuracoes">
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>
            Configurações
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            Fazer Logout
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple class="absolute-bottom q-mb-sm" @click="verProjeto()">
          <q-item-section avatar>
            <q-icon name="git" />
          </q-item-section>

          <q-item-section class="low-opacity">
            UnB na Mão [ Antares ]
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
    </q-drawer>
 
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSessionStore } from '../stores/session';
import { useRouter } from 'vue-router';

const router = useRouter()

function obterPrimeiraUltimaPalavra(nome: string) {
  const palavras = nome.split(' ');

  if (palavras.length === 1) {
    return palavras[0]; // Se houver apenas uma palavra, retorne-a sem repetição.
  }

  const primeiraPalavra = palavras[0];
  const ultimaPalavra = palavras[palavras.length - 1];
  return `${primeiraPalavra} ${ultimaPalavra}`;
}

const rightDrawerOpen = ref(true)
function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
const sessionStore = useSessionStore();
const sessionData = computed(() => sessionStore.getSessionData) as any

function logout () {
  const res = confirm('Deseja Fazer Logout ?')
  if(res) {
    sessionStore.clearSessionData()
    window.location.href = 'https://unbnamao.netlify.app'
    
  }
}

function verProjeto () {
  window.open('https://github.com/FGA0138-MDS-Ajax/2023-2-ANTARES', '_blank')
}
</script>
<style scoped>
.session-nome {
  font-size: 12px;
}
</style>