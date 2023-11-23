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
                        <img :src="sessionData.user_image">
                    </q-avatar>
                    <div class="text-weight-bold">{{ sessionData.nome }}</div>
                    <div>@{{ sessionData.login }}</div>
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
        <h1 class="title-page">Feed de notícias</h1>
        <q-card class="card-feed" v-for="(news, index) in vectorNews" :key="index" @click="openModalNews(news)">
            <q-card-section>
                <h2 class="title-card">{{ news.title }}</h2>
                <div>{{ news.body }}</div>
            </q-card-section>
        </q-card>
        <ModalComponent v-if = "modalNewsOpen" @fecharModal="fecharModalNews" class="modal-component">
            <template v-slot:modal-title>
                <h2>{{ selectedNews.title }}</h2>
            </template>
            <template v-slot:modal-text>
                <p>{{ selectedNews.body }}</p>
            </template>
            <template v-slot:botaoFechar>
                <q-btn label="Fechar" color="primary"  class="modal-close" @click="fecharModalNews" />
            </template>
        </ModalComponent>
    </q-layout>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSessionStore } from 'src/stores/session';
import { useRouter } from 'vue-router';
import { data } from 'autoprefixer';
import ModalComponent from '../components/ModalComponent.vue'

const vectorNews = [{ title: 'Título da Notícia 1', body: 'Corpo da Notícia 1' },
                    { title: 'Título da Notícia 2', body: 'Corpo da Notícia 2' },
                    { title: 'Título da Notícia 3', body: 'Corpo da Notícia 3' }]
const modalNewsOpen = ref(false)
const selectedNews = ref({ title: '', body: '' })

const router = useRouter()

const rightDrawerOpen = ref(true)
function toggleRightDrawer() {
    rightDrawerOpen.value = !rightDrawerOpen.value
}
const sessionStore = useSessionStore();
const sessionData = computed(() => sessionStore.getSessionData) as any

function logout() {
    const res = confirm('Deseja Fazer Logout ?')
    if (res) {
        sessionStore.clearSessionData()
        window.location.href = 'https://unbnamao.netlify.app'

    }
}

function openModalNews(news: any) {
    selectedNews.value = { title: news.title, body: news.body}
    modalNewsOpen.value = true
}

function fecharModalNews() {
    modalNewsOpen.value = false
}
</script>
<style>
.title-page {
    font-size: 30px;
    margin-top: 30px;
    margin-left: 20px;
}

.card-feed {
    margin-left: 100px;
    margin-right: 100px;
}

.title-card {
    font-size: 20px;
}

.modal-component {
    width: 50%;
    height: 50%;
    margin: auto;
}

.modal-close {
    width: auto;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}

</style>