<template>
    <q-page class="row justify-center items-center">
      <div class="background-image"></div>
      <q-card>
        <q-card-section class="bg-primary text-white">
          <div class="text-h4">Postar Publicação</div>
        </q-card-section>
  
        <q-card-section>
          <q-input filled v-model="titulo" label="Título *" />
          <q-input type="textarea" filled v-model="descricao" label="Descrição *" />
          <q-input class="q-mt-md" filled v-model="contato" label="Contato *" />
          <q-input filled v-model="link" label="Link *" />
  
          <q-checkbox v-model="programarPublicacao" label="Programar Publicação" />
  
          <q-input filled v-if="programarPublicacao" v-model="dataPublicacao" label="Data e Hora de Início *" readonly>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" @click="openDateTimePicker('dataPublicacao')" />
            </template>
          </q-input>
  
          <q-input filled v-model="dataEncerramento" label="Data e Hora de Encerramento *" readonly>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" @click="openDateTimePicker('dataEncerramento')" />
            </template>
          </q-input>
        </q-card-section>
  
        <q-card-actions align="right" class="q-px-md">
          <q-btn :disable="verificarDisableCampos()" color="positive" class="q-mb-sm " label="Publicar" @click="publicarVaga" />
        </q-card-actions>
      </q-card>
  
    <q-dialog v-model="dialogModel.isOpen">
      <q-date v-model="selectedDate" mask="YYYY-MM-DDTHH:mm">
        <div class="row items-center justify-end">
          <q-btn label="Confirmar" color="primary" flat @click="handleDateOk" />
        </div>
      </q-date>
    </q-dialog>
  </q-page>
</template>

<script lang="ts">
import { ref, reactive, defineComponent, registerRuntimeCompiler } from 'vue';
import PublicarVagasService from '../services/PublicarVagasService';
import { useSessionStore } from '../stores/session';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const titulo = ref(null) as any;
    const descricao = ref(null) as any;
    const contato = ref(null) as any;
    const link = ref(null) as any;
    const programarPublicacao = ref(false);
    const dataPublicacao = ref(null) as any;
    const dataEncerramento = ref(null) as any;
    const selectedDate = ref(null) as any;
    const dialogModel = reactive({ isOpen: false, type: '' });
    const $q = useQuasar();
    const router = useRouter()

    const openDateTimePicker = (type: 'dataPublicacao' | 'dataEncerramento') => {
      dialogModel.isOpen = true;
      dialogModel.type = type;
      selectedDate.value = type === 'dataPublicacao' ? dataPublicacao.value : dataEncerramento.value;
    };

    const handleDateOk = () => {
      if (dialogModel.type === 'dataPublicacao') {
        dataPublicacao.value = selectedDate.value;
      } else if (dialogModel.type === 'dataEncerramento') {
        dataEncerramento.value = selectedDate.value;
      }
      dialogModel.isOpen = false;
    };

    const publicarVaga = async () => {
        try {
          const sessionStore = useSessionStore();
          const usuarioLogado = sessionStore.getSessionData;

          const criador = usuarioLogado.nome;
          const params = {
            criador,
            titulo: titulo.value,
            descricao: descricao.value,
            contato: contato.value,
            link: link.value,
            dataPublicacao: dataPublicacao.value,
            dataEncerramento: dataEncerramento.value
          };
          const response = await PublicarVagasService(params).publicar();
          if (response.status == 201) {
            console.log('Vaga publicada com sucesso');
            router.replace('/feed');
            $q.notify({
              color: 'green-10',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Vaga publicada com sucesso',
              position: 'top',
              timeout: 2000
            });
          } else {
            console.log('Erro ao publicar vaga:', response.data.message);
            $q.notify({
              color: 'red-10',
              textColor: 'white',
              icon: 'warning',
              message: response.data.message,
              position: 'top',
              timeout: 3000
            });
          }
        } catch (e) {
          console.error('Erro na publicação da vaga:', e);
          $q.notify({
            color: 'red-9',
            textColor: 'white',
            icon: 'warning',
            message: 'Erro de Conexão',
            position: 'top',
            timeout: 3000
          });
        }
    };

    function verificarDisableCampos () {
      if (titulo.value && descricao.value && contato.value && link.value && dataEncerramento.value &&
          titulo.value.trim() != '' && descricao.value.trim() != '' && contato.value.trim() != '' && link.value.trim() != '' && dataEncerramento.value.trim() != '') {
        return false;
      } else {
        return true;
      }
    }

    return {
      titulo,
      descricao,
      contato,
      link,
      programarPublicacao,
      dataPublicacao,
      dataEncerramento,
      dialogModel,
      openDateTimePicker,
      handleDateOk,
      publicarVaga,
      selectedDate,
      verificarDisableCampos
    };
  }
});
</script>

  <style scoped>

  .q-page {
    background: #a5dbff31;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #74ff7426, #ffffff, #55bbff58);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #74ff7426, #ffffff, #55bbff58); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
    
  }

  #publish-vacancy {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #f5f5f5;
  }
    
  .q-pa-md {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  .q-card {
    max-width: 500px;
    width: 90%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  }
  
  .q-card-section {
    display: flex;
    flex-direction: column;
  }
  
  .q-input {
    margin-bottom: 15px;
  }
  
  .q-checkbox {
    margin-bottom: 15px;
  }
  
  .q-btn {
    width: 100%;
  }
  
  .q-tooltip {
    max-width: 200px;
    padding: 10px;
    background-color: #333;
    color: white;
    border-radius: 5px;
    font-size: 0.9em;
  }
  

  @media (max-width: 1600px) {
    .q-card {
      margin-top: 24px;
      margin-bottom: 24px;
      width: 95%;
    }
  }
  </style>
  