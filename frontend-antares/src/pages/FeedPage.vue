<template>
    <q-page>
        <h2 class="text-center q-py-lg">Feed de publicações</h2>
        <div class="column q-px-lg q-gutter-y-md">
            <q-card class="cursor-pointer" v-for="(news, index) in vectorNews" :key="index" @click="openModalNews(news)">
                <q-card-section>
                    <h4>{{ news.titulo }}</h4>
                    <div class="q-pt-sm">{{ news.descricao}}</div>
                </q-card-section>
            </q-card>
        </div>
        <ModalComponent v-if = "modalNewsOpen" @fecharModal="fecharModalNews" class="modal-component">
            <template v-slot:modal-title>
                <h4>{{ selectedNews.titulo }}</h4>
            </template>
            <template v-slot:modal-text>
                   <p>{{ selectedNews.descricao }}</p>
                   <a :href="selectedNews.link">Link da Vaga</a>
            </template>
            <template v-slot:botaoFechar>
                 <q-btn label="Fechar" color="primary"  class="modal-close" @click="fecharModalNews" />
            </template>
        </ModalComponent>
    </q-page>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeMount} from 'vue'
import { useSessionStore } from 'src/stores/session';
import { useRouter } from 'vue-router';
import { data } from 'autoprefixer';
import ModalComponent from '../components/ModalComponentFeed.vue'
import FeedService from '../services/FeedService'

const vectorNews = ref([]) as any


const modalNewsOpen = ref(false)
const selectedNews = ref(null) as any

const router = useRouter()

function openModalNews(news: any) {
    selectedNews.value = news
    modalNewsOpen.value = true
}

function fecharModalNews() {
    modalNewsOpen.value = false
}
onBeforeMount(async () => {
    try {
        const { listarFeed } = FeedService(null);
        const response = await listarFeed();
        console.log(JSON.stringify(response.data.vagas))
        vectorNews.value = response.data.vagas
    } 
    catch (error) {
        console.log(error)
    }
})
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