<template>
    <q-page>
        <h2 class="w100 text-center q-py-lg">Feed de publicações</h2>
        <div class="column q-px-lg q-gutter-y-md">
            <div class="q-pt-xl" v-if="vectorNews.length == 0">
                <h5 class="text-center">Não há publicações no momento</h5>
                <p style="font-size:100px" class="text-center q-pt-md">&#128531;</p>
            </div>
            <div class="cards row justify-center q-gutter-md q-mt-md">
                <q-card class="cursor-pointer" v-for="(news, index) in vectorNews" :key="index" @click="openModalNews(news)">
                    <q-card-section>
                            <h4>{{ news.titulo }}</h4>
                            <div class="q-pt-sm">{{ news.criadorEmail}}</div>
                            <h8 class="low-opacity">Postado em: {{ news.dataPublicacao.toLocaleDateString('pt-br') }}</h8>
                        </q-card-section>
                    </q-card>
            </div>
            <div v-if="vectorNews.length != 0" class="row w100 justify-center items-center q-py-md">
                <q-icon @click="atualizarPaginacao(-1)" class="cursor-pointer text-bold q-pr-md" size="md" :color="paginaAtual == 0 ? 'grey-5' : 'blue-7'" name="skip_previous"/>
                <div class="">ver mais vagas</div>
                <q-icon @click="atualizarPaginacao(1)" class="cursor-pointer text-bold q-pl-md" size="md" :color="paginaAtual + 1 == totalPaginas ? 'grey-5' : 'blue-7'" name="skip_next"/>
            </div>
        </div>
        <div class="modal-wrap" v-if="modalNewsOpen">
            <ModalComponent @fecharModal="fecharModalNews" class="modal-component rounded-borders">
                <template v-slot:modal-title>
                    <h4 class="q-pb-md">{{ selectedNews.titulo }}</h4>
                </template>
                <template v-slot:modal-text>
                    <div class="img row justify-center q-pb-sm ">
                        <img class="rounded-borders" id="img-selected" src="https://picsum.photos/500/500" alt="teste">
                    </div>
                    <q-btn label="Link da vaga" @click="openLink(selectedNews.link)" class="text-white bg-green-7 q-mb-md" icon="help"/>
                    <div class="row w100 q-pb-md">
                        <div class="label-modal row w10"><strong>Descrição:</strong></div><q-scroll-area style="height:120px; width:100%; background-color: #f1f1f1;" class="q-pl-sm q-pt-sm">{{ selectedNews.descricao }}</q-scroll-area>
                    </div>
                    <div class="contato row w100 q-pb-md">
                        <div class="label-modal row w10"><strong>Contato:</strong></div><div class="q-pl-sm">{{ selectedNews.contato }}</div>
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
    </q-page>
</template>

<script lang="ts" setup>
import { computed, ref, onBeforeMount} from 'vue'
import { useSessionStore } from 'src/stores/session';
import { useRouter } from 'vue-router';
import ModalComponent from '../components/ModalComponentFeed.vue'
import FeedService from '../services/FeedService'

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

async function atualizarPaginacao (num: number) {
    paginaAtual.value += num
    try {
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
    }
}

onBeforeMount(async () => {
    await atualizarPaginacao(0)
})
</script>

<style scoped>

.q-page {
    background-color: #c8c8c8;
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
    height: auto;
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
    width: 30%;
    height: 400px;
}

.q-card{
    background: #4fb151;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #4fb151, #107e44);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #4fb151, #107e44); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    color: #fafafa;
    width: 25%;
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
        width: 95%!important;
    }
    .cards {
        display: flex;
        flex-direction: column;
    }   
}

p{
    margin: 0px 0px 0px 0px !important;
    padding: 0px 0px 0px 0px !important;
    
}

.label-modal {
    background-color: #f0f0f0b0
}


</style>