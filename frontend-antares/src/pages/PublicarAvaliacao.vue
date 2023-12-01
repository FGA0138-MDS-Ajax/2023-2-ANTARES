<template>
  <q-page class="row justify-center items-center">
    <q-card>
      <q-card-section class="bg-primary text-white">
        <div class="text-h4">Avalie a Disciplina</div>
      </q-card-section>

      <q-card-section>
        <div v-for="(avaliacao, index) in avaliacoes" :key="index">
          <q-select filled v-model="avaliacao.professorSelecionado" :options="professores" label="Selecione o Professor" />
          <q-input filled v-if="avaliacao.outroProfessor" v-model="avaliacao.novoProfessor" label="Nome do Professor" />
          
          <div v-if="avaliacao.professorSelecionado" class="q-mt-md">
            <div v-for="(item, idx) in avaliacao.itensAvaliacao" :key="`avaliacao-${index}-item-${idx}`">
              <br/><br/><br/>
              <div>{{ item.label }}</div>
              <q-slider v-model="item.value" :min="1" :max="5" :step="1" color="blue">
                <template v-slot:label="scope">
                  <q-tooltip :style="{ backgroundColor: '#2196f3', color: 'white' }">{{ obterDescricaoAvaliacao(scope.value, item.etiquetas) }}</q-tooltip>
                </template>
              </q-slider>
              <div class="custom-markers">
                <span v-for="(etiqueta, etIndex) in item.etiquetas" :key="`etiqueta-${index}-${idx}-${etIndex}`">{{ etiqueta }}</span>
              </div>
            </div>
            <br/><br/><br/>
          </div>
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
import { useQuasar } from 'quasar';

export default defineComponent({
  setup() {
    const $q = useQuasar();
    const professores = ref(['Prof. 1', 'Prof. 2', 'Prof. 3', 'Outro Professor']);

    const avaliacoes = reactive([{
      professorSelecionado: null,
      outroProfessor: false,
      novoProfessor: '',
      itensAvaliacao: [
        {
          label: 'Dificuldade do Conteúdo',
          value: 3,
          etiquetas: ['Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil']
        },
        {
          label: 'Taxa Média de Aprovação na sua Turma',
          value: 3,
          etiquetas: ['Menos de 20%', 'Menos de 40', 'Menos de 60%', 'Menos de 80%', 'Mais de 80%']
        },
        {
          label: 'Disponibilidade do Professor',
          value: 3,
          etiquetas: ['Não responde dúvidas', 'Pouco disponível', 'Disponível', 'Muito disponível', 'Sempre disponível']
        },
        {
          label: 'Quantidade de listas de exercícios',
          value: 3,
          etiquetas: ['Nenhuma', 'Semanalmente', '2 por semana', '3 por semana', '4 ou mais por semana']
        },
        {
          label: 'Quantidade de provas',
          value: 3,
          etiquetas: ['Sem provas', '1 prova', '2 provas', '3 provas', '4 ou mais provas']
        },
        {
          label: 'Dificuldade das provas',
          value: 3,
          etiquetas: ['Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil']
        },
      
      ]
    }]);

    function adicionarAvaliacao() {
      avaliacoes.push({
        professorSelecionado: null,
        outroProfessor: false,
        novoProfessor: '',
        itensAvaliacao: [
          {
            label: 'Dificuldade do Conteúdo',
            value: 3,
            etiquetas: ['Muito Fácil', 'Fácil', 'Médio', 'Difícil', 'Muito Difícil']
          },
          
        ]
      });
    }

    function publicarAvaliacoes() {
      // Lógica para publicar todas as avaliações
      console.log('Publicando avaliações:', avaliacoes);
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Avaliações publicadas com sucesso',
        position: 'top',
        timeout: 2000
      });
    }

    function obterDescricaoAvaliacao(valor, etiquetas) {
      return etiquetas[valor - 1];
    }

    return {
      professores,
      avaliacoes,
      adicionarAvaliacao,
      publicarAvaliacoes,
      obterDescricaoAvaliacao
    };
  }
});
</script>


<style scoped>

.q-card-section {
  display: flex;
  flex-direction: column;
  gap: 24px; /* Aumenta o espaçamento entre itens de avaliação */
}

.q-slider + .custom-markers {
  margin-top: 8px; /* Ajusta o espaçamento após o slider */
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
  max-width: 500px;
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
</style>
