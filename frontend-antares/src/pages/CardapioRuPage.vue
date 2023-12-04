<template>
  <q-page class="q-pa-sm">
    <h3 class="text-center q-py-sm">Cardápio do RU</h3>
    <div class="q-pt-xl" v-if="cardapios.length == 0">
                <h5 class="text-center">Não há publicações no momento</h5>
    </div>

    <div class="q-gutter-sm">
      <q-card
        class="cursor-pointer q-sm"
        v-for="index in cardapios"
        :key="index"
        @click="obterCardapio"
      >
        <q-card-section class="text-h6 text-center q-sm">
          <h5>{{ index.campus }}</h5>
          <q-btn
            label="Link"
            @click="openLink(index.link)"
            class="text-white bg-green-7 q-mb-sm"
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
/* Estilos específicos aqui */
</style>
