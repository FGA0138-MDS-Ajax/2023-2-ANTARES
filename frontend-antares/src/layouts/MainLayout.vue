<template>
  <q-layout view="hHh lpR lfr">

    <q-header bordered class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-img class="absolute-top" src="https://cdn.quasar.dev/img/material.png" style="height: 200px">
        <div class="absolute-center column items-center bg-transparent">
          <q-avatar size="80px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png">
          </q-avatar>
          <div class="text-weight-bold">Grupo Antares</div>
          <div>@grupoantares</div>
        </div>
      </q-img>
    <!-- items do menu -->
    <q-scroll-area style="height: calc(100% - 200px); margin-top: 200px; border-right: 1px solid #ddd">
      <q-list padding>
        <q-item active clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="star" />
          </q-item-section>

          <q-item-section>
            Star
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="send" />
          </q-item-section>

          <q-item-section>
            Send
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="drafts" />
          </q-item-section>

          <q-item-section>
            Drafts
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
      </q-list>
    </q-scroll-area>
    </q-drawer>
 
    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const rightDrawerOpen = ref(false)

    return {
      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>