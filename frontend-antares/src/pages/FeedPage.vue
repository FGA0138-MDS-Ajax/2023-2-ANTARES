<template>
    <q-page>
        <h2 class="text-center q-py-lg">Feed de publicações</h2>
        <div class="column q-px-lg q-gutter-y-md">
            <div class="q-pt-xl" v-if="vectorNews.length == 0">
                <h5 class="text-center">Não há publicações no momento</h5>
                <p style="font-size:100px" class="text-center q-pt-md">&#128531;</p>
            </div>
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
                    <p><strong>Descrição: </strong>Descrição: {{ selectedNews.descricao }}</p>
                    <p><strong>Contato: </strong>{{ selectedNews.contato }}</p>
                    <div class="date-container">
                        <p><strong>Data de publicação: </strong>{{ selectedNews.dataPublicacao.toLocaleDateString('pt-br') }}</p>
                        <p class="finishing-date"><strong>Data de encerramento: </strong>{{ selectedNews.dataEncerramento.toLocaleDateString('pt-br') }}</p>
                    </div>
                    <q-btn label="Link da vaga" @click="openLink(selectedNews.link)" class="link-button"/>
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
function openLink(link: string) {
    window.open(link, '_blank')
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

.q-page {
    background: #fafafacf;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #fafafacf, #c9d6ff83);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #fafafacf, #c9d6ff83); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.modal-component {
    width: 80%;
    height: auto;
    margin: auto;
}

.modal-close {
    background-color: blue;
    width: auto;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}
.date-container {
    display: flex;
    justify-content: space-between;
    width: auto;
  }
.finishing-date {
    color: blue;
  }
.link-button { 
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px; 
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
}
</style>