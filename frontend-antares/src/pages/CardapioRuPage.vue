<template>
  <q-page class="q-pa-sm">
    <meta name="google-adsense-account" content="ca-pub-9172295644756939">
    <h3 class="text-center q-py-md">Cardápio do RU</h3>
    <div class="w100 trace q-mb-xl"></div>
    <div class="q-pt-xl" v-if="cardapios.length == 0">
                <h5 class="text-center">Não há publicações no momento</h5>
    </div>

    <div class="q-gutter-md">
      <q-card
        class="cursor-pointer"
        v-for="index in cardapios"
        :key="index"
        @click="obterCardapio"
      >
        <q-card-section class="text-h6 text-center">
          <h5 class="q-pb-sm">{{ index.campus }}</h5>
          <q-btn
            label="Link"
            @click="openLink(index.link)"
            class="text-white bg-green-7"
          />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue';
import CardapioService from '../services/CardapioService';


const cardapios = ref([]) as any;


function openLink(link: string) {
  console.log('Abrindo link:', link);
  window.open(link, '_blank');
}

async function obterCardapio() {
  try {
    const { getAll } = CardapioService("null");
    const response = await getAll();
    console.log('Dados do cardápio:', response);

    cardapios.value = response.data.cardapios;

    console.log('Array de cardápios:', cardapios);
  } catch (error) {
    console.error('Erro ao obter dados do cardápio:', error);
  }
}


onBeforeMount(obterCardapio);
</script>

<style scoped>
.trace {
  height: 1px;
  opacity: .3;
  background-color:black;
}
/* Estilos específicos aqui */
</style>
