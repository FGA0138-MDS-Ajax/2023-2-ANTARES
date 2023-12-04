<template>
    <q-page class="q-pa-md">
      <h2 class="text-h4 text-center q-mb-md q-py-md">Lista de Disciplinas</h2>
  
      <div class="row q-mb-xl q-px-xs">
        <q-input class="w50rem" v-model="search" placeholder="Pesquisar disciplina, professor ou código" @input="filterAndSortDisciplinas" />
        <q-select v-model="sortOrder" :options="sortOptions" label="Ordenar por"  @input="filterAndSortDisciplinas" />
      </div>
  
      <div v-if="disciplinasFiltradas.length === 0" class="text-center q-my-md">
        <p v-if="search !== ''">Nenhuma disciplina correspondente à pesquisa</p>
        <p v-else>Nenhuma disciplina encontrada</p>
      </div>
  
      <div class="row q-col-gutter-md q-px-md">
        <q-card class="my-card" v-for="(disciplina, index) in disciplinasFiltradas" :key="index" @click="goToDisciplina(disciplina.codigo)">
          <q-card-section>
            <div class="text-h6">{{ disciplina.nome }}</div>
            <div>Código: {{ disciplina.codigo }}</div>
            <div>Professor(es): {{ disciplina.professores.join(', ') }}</div>
          </q-card-section>
        </q-card>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import DisciplinaService from 'src/services/DisciplinaService.ts';
  
  const disciplinas = ref([]);
  const disciplinasFiltradas = ref([]);
  const search = ref('');
  const sortOrder = ref('recentes');
  const sortOptions = [
    { label: 'Atualizada Mais Recente', value: 'recent' },
    { label: 'Nome de A-Z', value: 'name' },
    { label: 'Código de A-Z', value: 'code' }
  ];
  
  const router = useRouter();
  const disciplinaService = DisciplinaService();
  
  const fetchDisciplinas = async () => {
      try {
          const response = await disciplinaService.listarDisciplinas();
          disciplinas.value = response.data;
          filterAndSortDisciplinas();
      } catch (error) {
          console.error('Erro ao buscar disciplinas:', error);
      }
  };
  
  const filterAndSortDisciplinas = () => {
      let searchLower = search.value.toLowerCase();
      disciplinasFiltradas.value = disciplinas.value.filter(
          d => d.nome.toLowerCase().includes(searchLower) ||
               d.codigo.toLowerCase().includes(searchLower) ||
               d.professores.some(p => p.toLowerCase().includes(searchLower))
      );
  
      if (sortOrder.value === 'name') {
        disciplinasFiltradas.value.sort((a, b) => a.nome.localeCompare(b.nome));
      } else if (sortOrder.value === 'code') {
        disciplinasFiltradas.value.sort((a, b) => a.codigo.localeCompare(b.codigo));
      }
  };
  
  const goToDisciplina = (codigo) => {
    router.push(`/disciplina/${codigo}`);
  };
  
  watch([search, sortOrder], filterAndSortDisciplinas);
  
  onMounted(fetchDisciplinas);
  </script>
  
  <style scoped>
    .q-page {
      background: #a5dbff31;  /* fallback for old browsers */
      background: -webkit-linear-gradient(to top, #74ff7426, #ffffff, #55bbff58);  /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(to top, #74ff7426, #ffffff, #55bbff58); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      
        padding: 20px;
    }
  
    h2.text-h4 {
        font-size: 40px;
        text-align: center;
    }
  
    .q-input,
    .q-select {
        max-width: 300px;
        margin-bottom: 15px;
    }
  
    .q-select {
        min-width: 200px;
    }
  
    .q-card {
        background-color: #ffffff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.1);
        transition: transform .3s;
        cursor: pointer;
        margin-bottom: 20px;
    }
  
    .q-card:hover {
        transform: translateY(-10px);
    }
  
    .q-card-section {
        color: #424242;
    }
  
    .text-h6 {
        color: #333;
        margin-bottom: 5px;
    }
  
    .my-card {
        width: 100%;
        min-width: 300px;
    }
  
    .row {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
    }
  
    .w50rem {
        width: 50rem;
    }

    @media (max-width: 600px) {
        .row {
            flex-direction: column;
        }
  
        .q-input,
        .q-select {
            max-width: 100%;
        }
    }
  </style>
  