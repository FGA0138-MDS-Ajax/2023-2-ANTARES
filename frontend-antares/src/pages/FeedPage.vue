<template>
    <q-page>
        <h2 class="w100 text-center q-py-lg">Feed de Publicações</h2>
        <div class="column q-px-lg q-gutter-y-md">
            <div class="q-pt-xl" v-if="vectorNews.length == 0">
                <h5 class="text-center">Não há publicações no momento</h5>
                <p style="font-size:100px" class="text-center q-pt-md">&#128237;</p>
            </div>
            <div class="cards row justify-center q-gutter-md q-mt-md">
                <q-card class="cursor-pointer row items-center justify-between q-px-md no-wrap" v-for="(news, index) in vectorNews" :key="index" @click="openModalNews(news)">
                    <q-card-section class="column">
                            <h4 class="q-mb-md">{{ news.titulo }}</h4>
                            <h8 class="low-opacity">Postado em: {{ news.dataPublicacao.toLocaleDateString('pt-br') }}</h8>
                            <h8 class="w100 bg-green-4" style="opacity:0.8">{{ news.role }}</h8>
                            <div class="">{{ news.criador}}</div>
                        </q-card-section>
                        <q-avatar size="90px" class="img-news">
                            <img  style="border-radius: 20%; border:6px solid rgba(48, 48, 48, 0.52)" :src="news.user_image.trim() == '' ? 'https://pbs.twimg.com/profile_images/1696145651006930945/r5LfokUU_400x400.jpg' : news.user_image">
                        </q-avatar>
                    </q-card>
            </div>
            <div v-if="vectorNews.length != 0" class="row w100 justify-center items-center q-py-xl">
                <q-btn style="border: none!important;" class="q-mr-md bg-grey-3" :disable="paginaAtual + 1 == totalPaginas"  @click="atualizarPaginacao(1)">
                    <q-icon class="cursor-pointer text-bold" size="md" :disable="paginaAtual" :color="paginaAtual == 0 ? 'grey-8' : 'blue-7'" name="skip_previous"/>
                </q-btn>
            <div class="">ver mais vagas</div>
                <q-btn style="border: none!important;" class="q-ml-md bg-grey-3" :disable="paginaAtual + 1 == totalPaginas"  @click="atualizarPaginacao(1)">
                    <q-icon class="cursor-pointer text-bold" size="md" :color="paginaAtual + 1 == totalPaginas ? 'grey-8' : 'blue-7'" name="skip_next"/>
                </q-btn>
            </div>
        </div>
        <div class="modal-wrap" v-if="modalNewsOpen">
            <ModalComponent @fecharModal="fecharModalNews" class="modal-component rounded-borders">
                <template v-slot:modal-title>
                    <h4 class="title-modal q-mb-lg q-pt-md">{{ selectedNews.titulo }}</h4>
                </template>
                <template v-slot:modal-text>
                    <q-btn label="Link da vaga" @click="openLink(selectedNews.link)" class="text-white bg-green-7 q-mb-md" icon="help"/>
                    <div class="row w100 q-pb-md">
                        <div class="label-modal row w100"><strong>Descrição:</strong></div><q-scroll-area style="height:120px; width:100%; background-color: #f1f1f1;" class="q-pl-sm q-pt-sm">{{ selectedNews.descricao }}</q-scroll-area>
                    </div>
                    <div class="contato row w100 q-pb-md">
                        <div class="label-modal row w100" ><strong>Contato:</strong></div><div class="q-pl-sm w100" style="background-color: #f1f1f1;">{{ selectedNews.contato }}</div>
                        <div class="row items-center q-mt-md no-wrap w100 text-bold low-opacity">
                            Postado por:  
                            <div class="q-pl-md text-blue-8">{{ selectedNews.criador }}</div>
                        </div>
                    </div>
                    <div class="date-container">
                            <p class="low-opacity"><strong>Data de publicação: </strong>{{ selectedNews.dataPublicacao.toLocaleDateString('pt-br') }}</p>
                            <p class="finishing-date  low-opacity"><strong>Data de encerramento: </strong>{{ selectedNews.dataEncerramento.toLocaleDateString('pt-br') }}</p>
                        </div>
                    </template>
                    <template v-slot:botaoFechar>
                    <div class="w100 row justify-center q-pb-md">
                        <q-btn label="Fechar" color="secondary"  class="modal-close" @click="fecharModalNews" />
                    </div>
                </template>
            </ModalComponent>
        </div>
        <LoadingComponent v-if="loading" />
    </q-page>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeMount} from 'vue'
import { useSessionStore } from '../stores/session';

import { useRouter } from 'vue-router';
import ModalComponent from '../components/ModalComponentFeed.vue'
import FeedService from '../services/FeedService'
import LoadingComponent from '../components/LoadingComponent.vue';

const sessionStore = useSessionStore();
const usuarioLogado = ref(sessionStore.getSessionData) as any

const vectorNews = ref([]) as any
const paginaAtual = ref(0)
const totalPaginas = ref(0)

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
const loading = ref(false)
async function atualizarPaginacao (num: number) {
    paginaAtual.value += num
    try { 
        loading.value = true
        const { listarFeed } = FeedService({numPagina: paginaAtual.value});
        const response = await listarFeed();
        console.log(JSON.stringify(response.data.totalPages))
        totalPaginas.value = response.data.totalPages
        vectorNews.value = response.data.vagas
        vectorNews.value.forEach((element: any) => {
            element.dataPublicacao = new Date(element.dataPublicacao)
            element.dataEncerramento = new Date(element.dataEncerramento)
        });
    } 
    catch (error) {
        console.log(error)
    } finally {
        loading.value = false
    }
}

onBeforeMount(async () => {
    await atualizarPaginacao(0)
})
</script>

<style scoped>

.q-page {
    background: #a5dbff31;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #74ff7426, #ffffff, #55bbff58);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #74ff7426, #ffffff, #55bbff58); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
}

.modal-wrap{
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0,0,0,0.5);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;

}

.modal-component {
    z-index: 999;
    width: 50%;
}

.modal-close {
    background-color: blue;
}
.date-container {
    display: flex;
    justify-content: space-between;
    width: auto;
  }
.finishing-date {
    color: #e32929;
    text-align: right;
}

.link-button { 
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
#img-selected {
    width: 90%;
    height: 200px;
}

.q-card{
    background: #00B4DB;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #0083B0, #00B4DB);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #0083B0, #00B4DB); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #fafafa;
    width: 70%;
    height: 12rem;
}

.q-card:hover {
    transition: all 0.2s linear;
    opacity: .8;
}

@media (max-width: 1200px) {
    .modal-component{
        width: 90%;
    }
    #img-selected {
        width: 100%;
        height: 200px;
    }
    .contato {
        display: flex;
        flex-direction: column!important;
    }
    .q-scroll-area{
        height: 200px!important;
    }
    .q-card {
        display: flex;
        flex-direction: column;
        width: 95%!important;
        height: 20rem;
    }
    .cards {
        display: flex;
        flex-direction: column;
    }   
}

p{
    margin: 0px 0px 0px 0px !important;
    padding: 0px 0px 0px 0px !important;
    color: #4d4d4d;
    
}

.label-modal {
    background-color: #4f4f4f3d
}

.img-news{
    margin-bottom: 24px!important;
}

.title-modal {
    color: #626262;
    font-weight: bold;
}

</style>