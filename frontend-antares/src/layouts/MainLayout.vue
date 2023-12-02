<template>
  <q-layout view="hHh lpR lfr">

    <q-header bordered class="bg-blue text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar class="q-mr-sm">
            <img src="https://pbs.twimg.com/profile_images/1696145651006930945/r5LfokUU_400x400.jpg">
          </q-avatar>
          UnB na Mão
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-img class="absolute-top" style="background: rgb(36, 36, 36); height: 200px">
        <div class="absolute-center column items-center bg-transparent">
          <q-avatar size="80px" class="q-mb-sm">
            <img :src="sessionData.user_image ? sessionData.user_image : 'https://picsum.photos/400'">
          </q-avatar>
          <div class="text-weight-bold">{{ sessionData.nome }}</div>
          <div>@{{ sessionData.matricula }}</div>
        </div>
      </q-img>
    <!-- items do menu -->
    <q-scroll-area style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd">
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

        
        <q-item clickable v-ripple>
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
</script>