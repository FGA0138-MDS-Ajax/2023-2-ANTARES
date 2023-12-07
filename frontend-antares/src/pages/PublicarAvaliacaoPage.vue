<template>
    <q-page class="row justify-center items-center">
      <meta name="google-adsense-account" content="ca-pub-9172295644756939">
      <q-card class="q-mb-xl">
        <q-card-section class="card-header">
          <q-btn flat round icon="arrow_back" @click="voltarParaHome" class="back-button" />
          <div class="text-h4">{{ nomeDisciplina }} - {{ codigoDisciplina }}</div>
        </q-card-section>
        <q-card-section>
          <div class="descricao-disciplina">Nossos critérios de avaliação da disciplina levam em conta a forma com que cada professor ministra as disciplinas. Abaixo aparecerão perguntas que podem ser avaliadas de 1 a 5 de acordo com a legenda de cada uma delas.</div>
        </q-card-section>
        <q-card-section>
          <div v-for="(avaliacao, index) in avaliacoes" :key="index" class="avaliacao-section">
            <q-select filled v-model="avaliacao.professorSelecionado" :options="professores" label="Selecione o Professor" />
            <div v-if="avaliacao.professorSelecionado">
              <div v-for="item in avaliacao.itensAvaliacao" :key="item.id" class="item-avaliacao">
                  <div class="item-label">{{ item.label }}</div>
        
                  <q-slider v-model="item.value" :class="{'hide-label': !item.mostrarEtiquetas}" :min="1" :max="5" :step="1" color="blue" snap label @mousedown="iniciarTooltip(index)" @mouseup="finalizarTooltip(index)" @mouseleave="finalizarTooltip(index)" @touchend="finalizarTooltip(index)">
                    <template v-slot:label="scope" v-if="avaliacao.mostrarEtiquetas">
                      <q-tooltip>{{ item.etiquetas[scope.value - 1] }}</q-tooltip>
                    </template>
                  </q-slider>
                  <div class="custom-markers">
                    <span v-for="(etiqueta, etIndex) in item.etiquetas" :key="`etiqueta-${index}-${idx}-${etIndex}`">{{ etiqueta }}</span>
                  </div>
                </div>
              </div>
              <q-btn v-if="avaliacoes.length > 1" flat color="negative" icon="delete" label="Excluir esta avaliação" @click="excluirAvaliacao(index)" class="delete-button" />
            </div>
    
            <q-btn color="positive" class="q-mt-md" label="Adicionar Avaliação de Outro Professor" @click="adicionarAvaliacao" />
          </q-card-section>
    
          <q-card-actions align="right" class="q-px-md q-pb-md">
            <q-btn color="positive" label="Publicar Avaliações" @click="publicarAvaliacoes" />
          </q-card-actions>
        </q-card>
      </q-page>
  </template>
    
  <script>
  import { ref, reactive, onMounted, defineComponent } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useQuasar } from 'quasar';
  import { api } from '../boot/axios';
  import { useSessionStore } from '../stores/session';
  
  
  export default defineComponent({
    setup() {
      const $q = useQuasar();
      const router = useRouter();
      const route = useRoute();
      const codigoDisciplina = ref(route.params.codigo);
      const nomeDisciplina = ref('');
      const professores = ref([]);
      const sessionStore = useSessionStore();
    
      const criteriosPadrao = [
            {
              label: 'Dificuldade do Conteúdo',
              value: 1,
              descricaoAtual: 'Médio',
              etiquetas: ['Simples', 'Fácil', 'Médio', 'Difícil', 'Árduo']
            },
            {
              label: 'Taxa Média de Aprovação na sua Turma',
              value: 1,
              mostrarEtiquetas: false,
              etiquetas: ['até 20%', 'até 40%', 'até 60%', 'até 80%', '+80%']
            },
            {
              label: 'Disponibilidade do Professor',
              value: 1,
              mostrarEtiquetas: false,
              etiquetas: ['Inacessível', 'Muito Acessível']
            },
            {
              label: 'Listas por semana',
              value: 1,
              mostrarEtiquetas: false,
              etiquetas: ['0', '1', '2', '3', '4 ou +']
            },
            {
              label: 'Quantidade de provas',
              value: 1,
              mostrarEtiquetas: false,
              etiquetas: ['Sem provas', '1 prova', '2 provas', '3 provas', '4 ou mais provas']
            },
            {
              label: 'Dificuldade das provas',
              value: 1,
              mostrarEtiquetas: false,
              etiquetas: ['Simples', 'Fácil', 'Médio', 'Difícil', 'Árduo']
            },
            {
              label: 'Quantidade de trabalhos',
              value: 1,
              mostrarEtiquetas: false,
              etiquetas: ['0', '1', '2', '3', '4 ou +']
            }
      ]
  
      const avaliacoes = reactive([{
        professorSelecionado: null,
        itensAvaliacao: [...criteriosPadrao.map((item, idx) => ({ ...item, id: `item-${0}-${idx}` }))]
      }]);
  
      onMounted(async () => {
        await carregarDadosDisciplina();
      });
  
      async function carregarDadosDisciplina() {
        try {
          const response = await api.get(`/disciplina/${codigoDisciplina.value}`);
          const data = response.data; 
          nomeDisciplina.value = data.nome;
          professores.value = data.professores.map(professorNome => ({ label: professorNome, value: professorNome }));
        } catch (error) {
          console.error('Erro ao buscar dados da disciplina:', error);
          $q.notify({
            color: 'negative',
            position: 'top',
            message: 'Erro ao carregar dados da disciplina',
            icon: 'report_problem'
          });
        }
      }
  
      function adicionarAvaliacao() {
        avaliacoes.push({
          professorSelecionado: null,
          itensAvaliacao: [...criteriosPadrao.map((item, idx) => ({ ...item, id: `item-${avaliacoes.length}-${idx}` }))]
        });
      }
  
      function excluirAvaliacao(index) {
        avaliacoes.splice(index, 1);
      }
  
      async function publicarAvaliacoes() {
        const usuarioLogado = sessionStore.getSessionData; 
        const matricula = usuarioLogado.matricula;
        try {
          const payload = {
          matricula: matricula,
          avaliacoes: avaliacoes.map(avaliacao => {
            return {
              disciplina_codigo: codigoDisciplina.value,
              professor_nome: avaliacao.professorSelecionado.label,
              dificuldade_disciplina: avaliacao.itensAvaliacao.find(item => item.label === 'Dificuldade do Conteúdo').value,
              taxa_aprovacao: avaliacao.itensAvaliacao.find(item => item.label === 'Taxa Média de Aprovação na sua Turma').value,
              dificuldade_avaliacoes: avaliacao.itensAvaliacao.find(item => item.label === 'Dificuldade das provas').value,
              disponibilidade_professor: avaliacao.itensAvaliacao.find(item => item.label === 'Disponibilidade do Professor').value,
              quantidade_listas_exercicio: avaliacao.itensAvaliacao.find(item => item.label === 'Listas por semana').value,
              quantidade_provas: avaliacao.itensAvaliacao.find(item => item.label === 'Quantidade de provas').value,
              quantidade_trabalhos: avaliacao.itensAvaliacao.find(item => item.label === 'Quantidade de trabalhos').value
            }
        })
      };
      console.log("EEEEE")
      console.log(payload)
      const response = await api.post("/avaliacao", payload);
      if (response.status == 201) {
        console.log('Avaliações publicadas com sucesso');
        router.replace('/disciplinas');
        $q.notify({
          color: 'positive',
          position: 'top',
          message: 'Avaliações publicadas com sucesso!',
          icon: 'check'
        });
      } else {
        console.log('Erro ao publicar avaliações:', response.data.message);
        $q.notify({
          color: 'negative',
          position: 'top',
          message: response.data.message,
          icon: 'report_problem'
        });
      }
    } catch (error) {
      console.error('Erro ao publicar avaliações:', error);
      $q.notify({
        color: 'negative',
        position: 'top',
        message: 'Erro ao publicar avaliações',
        icon: 'report_problem'
      });
    }
  }
  
  
      function voltarParaHome() {
        router.push('/disciplinas');
      }
  
      function iniciarTooltip(index) {
        avaliacoes[index].itensAvaliacao.forEach(item => {
          item.mostrarEtiquetas = true;
        });
      }
  
      function finalizarTooltip(index) {
        avaliacoes[index].itensAvaliacao.forEach(item => {
          item.mostrarEtiquetas = false;
        });
      }
  
      function handleProfessorChange(avaliacao, valorSelecionado) {
        avaliacao.outroProfessor = valorSelecionado === 'Outro Professor';
      }
  
      return {
        nomeDisciplina,
        codigoDisciplina,
        professores,
        avaliacoes,
        adicionarAvaliacao,
        excluirAvaliacao,
        publicarAvaliacoes,
        voltarParaHome,
        iniciarTooltip,
        finalizarTooltip,
        handleProfessorChange
      };
    }
  });
  </script>
    
    
  <style scoped>
    .card-header {
      display: flex;
      align-items: center;
      position: relative;
    }
    
    .q-card-section {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    
    .item-label {
      font-weight: bold;
      font-size: 1.2rem;
      margin-bottom: 25px;
    }
    
    .delete-button {
      margin-top: 10px;
      margin-bottom: 20px;
    }
    
    .item-avaliacao {
      padding: 16px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      margin-bottom: 16px;
    }
    
    .q-slider + .custom-markers {
      margin-top: 8px;
    }
    
    .q-tooltip {
      background-color: #2196f3; /* Cor de fundo do balão (azul) */
      color: white; /* Cor do texto */
      border-radius: 4px; /* Arredonda os cantos do balão */
    }
    
    .q-page {
      background: linear-gradient(to top, #74ff7426, #ffffff, #55bbff58);
    }
    
    .q-card {
      max-width: 600px;
      width: 90%;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
    
    .q-input, .q-select, .q-slider {
      margin-bottom: 15px;
    }
    
    .q-btn {
      width: 100%;
    }
    
    
    .custom-markers {
      display: flex;
      justify-content: space-between;
      margin-top: -12px;
    }
    
    .custom-markers span {
      font-size: 0.75rem;
      text-align: center;
      width: 20%;
    }
    
    .back-button {
      left: 0px;
      width: 40px;
      height: 40px;
      margin-right: 20px;
    }
    
    .text-h4{
      text-align: center;
      font-size: 1.8rem;
      font-weight: 500;
    }
    
    .hide-label .q-slider__label {
      display: none;
    }
    
    .descricao-disciplina{
      font-size: 1rem;
      color: #616161;
      text-align:justify;
    }
    
    .avaliacao-section{
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 15px;
    }
    </style>
    