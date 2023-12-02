<template>
    <q-page class="row justify-center items-center">
      <q-card>    
        <q-card-section class="card-header">
          <q-btn flat round icon="arrow_back" @click="voltarParaHome" class="back-button" />
          <div class="text-h4">{{ nomeDisciplina }}</div>
        </q-card-section>
        <q-card-section>
          <div class="descricao-disciplina">Nossos critérios de avaliação da disciplina levam em conta a forma com que cada professor ministra as disciplinas. Abaixo aparecerão perguntas que podem ser avaliadas de 1 a 5 de acordo com a legenda de cada uma delas.</div>
        </q-card-section>
        <q-card-section>
          <div v-for="(avaliacao, index) in avaliacoes" :key="index" class="avaliacao-section">
            <q-select filled v-model="avaliacao.professorSelecionado" :options="professores" label="Selecione o Professor" />          
            <div v-if="avaliacao.professorSelecionado">
              <div v-for="(item, idx) in avaliacao.itensAvaliacao" :key="`avaliacao-${index}-item-${idx}`" class="item-avaliacao">
                <div class="item-label">{{ item.label }}</div>
                <q-slider v-model="item.value" :class="{'hide-label': !item.mostrarEtiquetas}" :min="1" :max="5" :step="1" color="blue" label-always @mousedown="iniciarTooltip(index)" @mouseup="finalizarTooltip(index)" @mouseleave="finalizarTooltip(index)" @touchend="finalizarTooltip(index)">
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
  
        <q-card-actions align="right" class="q-px-md">
          <q-btn color="positive" label="Publicar Avaliações" @click="publicarAvaliacoes" />
        </q-card-actions>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { ref, reactive, defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { useQuasar } from 'quasar';
  
  export default defineComponent({
    // props: {
    //   nomeDisciplina: String
    // },
  
    setup(props) {
      const mostrarTooltip = ref(false);
      const $q = useQuasar();
      const router = useRouter();
      const professores = ref(['Matheus Bernardini', 'Tatiane Evangelista', 'Ricardo Frageli']);
  
      const criteriosPadrao = [
          {
            label: 'Dificuldade do Conteúdo',
            value: 3,
            descricaoAtual: 'Médio',
            etiquetas: ['Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil']
          },
          {
            label: 'Taxa Média de Aprovação na sua Turma',
            value: 3,
            mostrarEtiquetas: false,
            etiquetas: ['Menos de 20%', 'Menos de 40', 'Menos de 60%', 'Menos de 80%', 'Mais de 80%']
          },
          {
            label: 'Disponibilidade do Professor',
            value: 3,
            mostrarEtiquetas: false,
            etiquetas: ['Não responde dúvidas', 'Pouco disponível', 'Disponível', 'Muito disponível', 'Sempre disponível']
          },
          {
            label: 'Quantidade de listas de exercícios',
            value: 3,
            mostrarEtiquetas: false,
            etiquetas: ['Nenhuma', 'Semanalmente', '2 por semana', '3 por semana', '4 ou mais por semana']
          },
          {
            label: 'Quantidade de provas',
            value: 3,
            mostrarEtiquetas: false,
            etiquetas: ['Sem provas', '1 prova', '2 provas', '3 provas', '4 ou mais provas']
          },
          {
            label: 'Dificuldade das provas',
            value: 3,
            mostrarEtiquetas: false,
            etiquetas: ['Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil']
          },
        ]
      
      const avaliacoes = reactive([{
        professorSelecionado: null,
        itensAvaliacao: [...criteriosPadrao]
      }]);
  
      function adicionarAvaliacao() {
        avaliacoes.push({
          professorSelecionado: null,
          outroProfessor: false,
          novoProfessor: '',
          itensAvaliacao: [...criteriosPadrao]
        });
      }
  
      function excluirAvaliacao(index) {avaliacoes.splice(index, 1);}
  
      function publicarAvaliacoes() {
        // Lógica para publicar todas as avaliações
      }
  
      function voltar() {
        router.back();
      }
  
      function voltarParaHome() {
        router.push('/app');
      }
  
      function obterDescricaoAvaliacao(valor, etiquetas) {
        return etiquetas[valor - 1];
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
        professores,
        avaliacoes,
        adicionarAvaliacao,
        excluirAvaliacao,
        publicarAvaliacoes,
        voltar,
        obterDescricaoAvaliacao,
        voltarParaHome, 
        mostrarTooltip,
        iniciarTooltip,
        finalizarTooltip,
        handleProfessorChange,
        // nomeDisciplina: props.nomeDisciplina
        nomeDisciplina: 'Cálculo 1'
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
  