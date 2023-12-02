<template>
  <q-page class="q-pa-md">
    <h2 class="text-h4">{{ disciplina.nome }}</h2>
    <div>
      <p><strong>Código:</strong> {{ disciplina.codigo }}</p>
      <p><strong>Carga Horária:</strong> {{ disciplina.carga_horaria }}</p>
      <p><strong>Pré-requisitos:</strong> {{ disciplina.pre_requisitos && disciplina.pre_requisitos.length > 0 ? disciplina.pre_requisitos.join(', ') : 'Nenhum' }}</p>
      <p><strong>Equivalências:</strong> {{ disciplina.equivalencia && disciplina.equivalencia.length > 0 ? disciplina.equivalencia.join(', ') : 'Nenhuma' }}</p>
      <p><strong>Disciplinas que Tranca:</strong> {{ disciplina.tranca && disciplina.tranca.length > 0 ? disciplina.tranca.join(', ') : 'Nenhuma' }}</p>
      <p><strong>Professores:</strong> {{ disciplina.professores && disciplina.professores.length > 0 ? disciplina.professores.join(', ') : 'Nenhum' }}</p>
    </div>
    
    <div class="avaliacoes-section">
      <h3>Médias de Avaliações por Professor</h3>
      <div v-for="(avaliacao, index) in avaliacoes" :key="index">
        <h4>{{ avaliacao._id.professor_nome }}</h4>
        <grafico-avaliacao :avaliacao="avaliacao.avaliacoes" :criterios="criterios" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '../boot/axios';
import GraficoAvaliacao from 'src/components/GraficoAvaliacao.vue';

const route = useRoute();
const disciplinaCodigo = ref(route.params.codigo);
const disciplina = ref({});
const avaliacoes = ref([]);

const listarDisciplinaEspecifica = async () => {
  try {
    const response = await api.get(`/disciplina/${disciplinaCodigo.value}`);
    return response;
  } catch (error) {
    throw error;
  }
}

const listarAvaliacoesMediaDisciplina = async () => {
  try {
    const response = await api.get(`/disciplina/${disciplinaCodigo.value}/avaliacoes-media`);
    return response;
  } catch (error) {
    throw error;
  }
}

const fetchDisciplinas = async () => {
  try {
    const respostaDisciplina = await listarDisciplinaEspecifica();
    const respostaAvaliacoes = await listarAvaliacoesMediaDisciplina();
    disciplina.value = respostaDisciplina.data;
    avaliacoes.value = respostaAvaliacoes.data;
  } catch (error) {
    console.error('Erro ao buscar disciplinas:', error);
  }
};

onMounted(fetchDisciplinas);
</script>

