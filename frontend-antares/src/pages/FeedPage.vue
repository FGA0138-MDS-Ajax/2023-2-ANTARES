<template>
    <q-page>
        <h2 class="text-center q-py-lg">Feed de publicações</h2>
        <div class="column q-px-lg q-gutter-y-md">
            <q-card class="cursor-pointer" v-for="(news, index) in vectorNews" :key="index" @click="openModalNews(news)">
                <q-card-section>
                    <h4>{{ news.title }}</h4>
                    <div>{{ news.body }}</div>
                </q-card-section>
            </q-card>
        </div>
        <ModalComponent v-if = "modalNewsOpen" @fecharModal="fecharModalNews" class="modal-component">
            <template v-slot:modal-title>
                <h4>{{ selectedNews.title }}</h4>
            </template>
            <template v-slot:modal-text>
                   <p>{{ selectedNews.body }}</p>
            </template>
            <template v-slot:botaoFechar>
                 <q-btn label="Fechar" color="primary"  class="modal-close" @click="fecharModalNews" />
            </template>
        </ModalComponent>
    </q-page>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useSessionStore } from 'src/stores/session';
import { useRouter } from 'vue-router';
import { data } from 'autoprefixer';
import ModalComponent from '../components/ModalComponentFeed.vue'

const vectorNews = [{ title: 'Título da Notícia 1', body: 'Corpo da Notícia 1' },
                    { title: 'Título da Notícia 2', body: 'Corpo da Notícia 2' },
                    { title: 'Título da Notícia 3', body: 'Corpo da Notícia 3' }]
const modalNewsOpen = ref(false)
const selectedNews = ref({ title: '', body: '' })

const router = useRouter()

function openModalNews(news: any) {
    selectedNews.value = { title: news.title, body: news.body}
    modalNewsOpen.value = true
}

function fecharModalNews() {
    modalNewsOpen.value = false
}
</script>
<style scoped>

.modal-component {
    width: 80%;
    height: 80%;
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