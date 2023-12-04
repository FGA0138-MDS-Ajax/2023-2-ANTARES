<template>
    <q-page class="q-pa-md page-container">
      <div class="content-container">
        <h2 class="text-h6 text-center">{{ disciplina.nome }}</h2>
        <div class="disciplina-info">
          <p class="info-item"><strong>Código:</strong> {{ disciplina.codigo }}</p>
          <p class="info-item"><strong>Carga Horária:</strong> {{ disciplina.carga_horaria }} horas</p>
          <p class="info-item"><strong>Professores:</strong> {{ disciplina.professores && disciplina.professores.length > 0 ? disciplina.professores.join(', ') : 'Nenhum' }}</p>
        </div>
  
        <div class="avaliacao-button">
          <q-btn
            v-if="!usuarioAvaliou"
            color="primary"
            label="Avaliar Disciplina"
            class="full-width"
            @click="irParaPaginaAvaliacao(disciplina.codigo)"
          />
          <q-btn
            v-else
            color="green"
            icon="check"
            label="Avaliado"
            class="full-width"
          />
        </div>
  
        <h3 class="text-h6 text-center q-mt-md q-mb-md">Médias de Avaliações por Professor</h3>
        <q-list bordered class="rounded-borders">
          <div v-for="(avaliacao, index) in avaliacoes" :key="index">
            <q-expansion-item 
                v-for="(avaliacao, index) in avaliacoes" 
                :key="index"
                switch-toggle-side 
                expand-separator 
                icon="perm_identity" 
                :label="`${avaliacao._id.professor_nome} (${QtdAvalProf[avaliacao._id.professor_nome] || 0} avaliações)`"
                @show="() => toggle(index)" 
                @hide="() => toggle(index)"
                class="q-mb-md"
              >
              <q-card>
                <q-card-section>
                  <div v-if="avaliacao.show">
                    <div v-for="(media, idx) in avaliacao.medias" :key="idx">
                      <div>{{ media.titulo }}</div>
                      <q-linear-progress rounded size="20px" :value="Number(media.valor)/5" color="green" class="q-mt-sm" :max="5" />
                      <div v-if="media.titulo === 'Dificuldade das Provas'" class="legenda">
                        <span>Muito fácil</span><span>Fácil</span><span>Médio</span><span>Difícil</span><span>Muito difícil</span>
                      </div>
                      <div v-else-if="media.titulo === 'Dificuldade da Disciplina'" class="legenda">
                        <span>Muito fácil</span><span>Fácil</span><span>Médio</span><span>Difícil</span><span>Muito difícil</span>
                      </div>
                      <div v-else-if="media.titulo === 'Disponibilidade do Professor'" class="legenda">
                        <span>Muito disponível</span><span>Disponível</span><span>Médio</span><span>Indisponível</span><span>Muito indisponível</span>
                      </div>
                      <div v-else-if="media.titulo === 'Frequencia das Listas de Exercício'" class="legenda">
                        <span>Nenhuma</span><span>Poucas</span><span>Média</span><span>Muitas</span><span>Muitíssimas</span>
                      </div>
                      <div v-else-if="media.titulo === 'Quantidade de Provas'" class="legenda">
                        <span>Nenhuma</span><span>Poucas</span><span>Média</span><span>Muitas</span><span>Muitíssimas</span>
                      </div>
                      <div v-else-if="media.titulo === 'Quantidade de Trabalhos'" class="legenda">
                        <span>Nenhum</span><span>Poucos</span><span>Médio</span><span>Muitos</span><span>Muitíssimos</span>
                      </div>
                      <div v-else-if="media.titulo === 'Média de Aprovação'" class="legenda">
                        <span>menos de 20%</span><span>menos 40%</span><span>menos de 60%</span><span>menos de 80%</span><span>mais de 80%</span>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </div>
        </q-list>
      </div>
    </q-page>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { api } from '../boot/axios';
  import { useSessionStore } from '../stores/session';
  
  const router = useRouter();
  const route = useRoute();
  const disciplinaCodigo = ref(route.params.codigo);
  const disciplina = ref({});
  const avaliacoes = ref([]); 
  const usuarioAvaliou = ref(false); 
  const totalAvaliacoes = ref(0);
  const QtdAvalProf = ref([]);
  const sessionStore = useSessionStore();
  
  
  const verificarUsuarioAvaliou = async () => {
    try {
      const usuarioLogado = sessionStore.getSessionData; 
      const usuarioMatricula = ref(usuarioLogado.matricula);
      const response = await api.get(`/avaliacoes/count/${usuarioMatricula.value}/${disciplinaCodigo.value}`);
      usuarioAvaliou.value = response.data > 0;
      totalAvaliacoes.value = response.data.total;
    } catch (error) {
      console.error('Erro ao verificar se o usuário avaliou a disciplina:', error);
    }
  };
  
  const listarQtdAvalProf = async () => {
    try {
      const response = await api.get(`/avaliacoes/professores/${disciplinaCodigo.value}`);
      QtdAvalProf.value = response.data;
      console.log(QtdAvalProf.value);
    } catch (error) {
      console.error('Erro ao buscar avaliações médias da disciplina:', error);
    }
  };
  
  const listarDisciplinaEspecifica = async () => {
    try {
      const response = await api.get(`/disciplina/${disciplinaCodigo.value}`);
      disciplina.value = response.data;
    } catch (error) {
      console.error('Erro ao buscar disciplina específica:', error);
    }
  };
  
  const listarAvaliacoesMediaDisciplina = async () => {
    try {
      const response = await api.get(`/disciplina/${disciplinaCodigo.value}/avaliacoes-media`);
      avaliacoes.value = response.data.map(av => ({
        ...av,
        totalAvaliacoes: av.total,
        show: false,
        medias: [
          { titulo: 'Dificuldade da Disciplina', valor: av.mediaDificuldadeDisciplina },
          { titulo: 'Disponibilidade do Professor', valor: av.mediaDisponibilidadeProfessor },
          { titulo: 'Frequencia das Listas de Exercício', valor: av.mediaQuantidadeListasExercicio },
          { titulo: 'Quantidade de Trabalhos', valor: av.mediaQuantidadeTrabalhos },
          { titulo: 'Quantidade de Provas', valor: av.mediaQuantidadeProvas },
          { titulo: 'Dificuldade das Provas', valor: av.mediaDificuldadeAvaliacoes },
          { titulo: 'Média de Aprovação', valor: av.mediaTaxaAprovacao }
        ]
      }));
    } catch (error) {
      console.error('Erro ao buscar avaliações médias da disciplina:', error);
    }
  };
  
  const irParaPaginaAvaliacao = (codigo) => {
    router.push(`/publicar-avaliacao/${codigo}`);
  };
  
  onMounted(async () => {
    await listarDisciplinaEspecifica();
    await listarAvaliacoesMediaDisciplina();
    await verificarUsuarioAvaliou();
    await listarQtdAvalProf();
  });
  
  const toggle = (index) => {
    avaliacoes.value[index].show = !avaliacoes.value[index].show;
  };
  </script>
  
  
  <style>
  .page-container {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
  
  .content-container {
    max-width: 800px;
    margin: auto;
  }
  
  .disciplina-info .info-item {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  
  .avaliacao-button {
    margin-top: 1rem;
  }
  
  .q-expansion-item {
    transition: box-shadow 0.3s;
  }
  
  .q-expansion-item:hover {
    box-shadow: 0 4px 6px rgba(0,0,0,0.15);
  }
  
  .full-width {
    width: 100%;
  }
  .legenda{
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-top: 0.5rem;
    margin-bottom: 20px;
  }
  
  </style>