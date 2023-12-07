<template>
    <q-page>
      <meta name="google-adsense-account" content="ca-pub-9172295644756939">
        <h2 class="text-center q-py-lg">Controle de faltas</h2>
        <div class="center-btn">
            <q-btn label="Adicionar matéria" @click="openRegisterModal()"
                class="text-white bg-blue-7 q-mb-md q-ml-md items-center" />
        </div>
        <div class="cards q-gutter-md q-mt-md">
            <q-card class="cursor-pointer justify-between q-px-md no-wrap" v-for="(subject, index) in vectorSubject"
                :key="index">
                <q-card-section class="column">
                    <div class="row items-center justify-between">
                        <div class="info">
                            <h5 class="q-mb-md">{{ subject.materia }}</h5>

                        </div>
                        <div class="faltas">
                            <div>
                                {{ subject.horas }} horas
                            </div>
                            <div>
                                Limite de faltas: {{ calculateLimiteFaltas(subject.horas) }}
                            </div>
                        </div>
                    </div>
                    <div class="row items-center justify-between">
                        <q-btn class="text-white bg-blue-7 q-mb-md" @click="subtractFalta(index)">
                            <q-icon name="remove" />
                        </q-btn>
                        <h8 style="opacity:0.8">Faltas: {{ subject.faltas }}</h8>
                        <q-btn class="text-white bg-blue-7 q-mb-md" @click="addFalta(index)">
                            <q-icon name="add" />
                        </q-btn>
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div v-if="modalVisible" class="modal-background">
            <div class="modal-content q-pa-md">
                <h4 class="text-h6 text-center">Adicionar Matéria</h4>
                <q-form @submit="addSubject">
                    <q-input v-model="newSubject.materia" label="Nome" required />
                    <q-input v-model="newSubject.horas" type="number" label="Carga Horária" required />
                    <div class="row w100 justify-center no-wrap q-gutter-x-md">
                      <q-btn label="Fechar" color="primary" class="text-white bg-blue-7 items-center"  @click="closeModal" />
                      <q-btn type="submit" label="Adicionar" icon-right="playlist_add_check" class="text-white bg-green-8 items-center" />
                    </div>
                </q-form>
            </div>
        </div>
    </q-page>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useSessionStore } from '../stores/session';
import FaltasService from '../services/FaltasService';

export default {
  setup() {
    const vectorSubject = ref([]);
    const modalVisible = ref(false);
    const newSubject = ref({
      materia: '',
      horas: '',
      faltas: 0,
    });
    const $q = useQuasar();

    const calculateLimiteFaltas = (horas) => {
      return Math.floor((horas * 0.25) / 2);
    };

    const openRegisterModal = () => {
      modalVisible.value = true;
    };

    const closeModal = () => {
      modalVisible.value = false;
      newSubject.value.materia = '';
      newSubject.value.horas = '';
    };

    const subtractFalta = (index) => {
      if (vectorSubject.value[index].faltas > 0) {
        vectorSubject.value[index].faltas -= 1;
      }
    };

    const addFalta = (index) => {
      vectorSubject.value[index].faltas += 1;
    };

    const fetchData = async () => {
      try {
        const sessionStore = useSessionStore();
        const usuarioLogado = sessionStore.getSessionData;
        const matricula = usuarioLogado.matricula;
        const params = {
          matricula,
        };
        console.log("params", params);
        const response = await FaltasService(params).listar();
        vectorSubject.value = response.data;
        console.log("response", JSON.stringify(response));
        if (response.status == 200) {
          vectorSubject.value = response;
          
        } else {
          console.log('Erro ao listar matérias:', response.data.message);
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
        console.error('Erro na listagem de matérias:', e);
        $q.notify({
          color: 'red-9',
          textColor: 'white',
          icon: 'warning',
          message: 'Erro de Conexão',
          position: 'top',
          timeout: 3000
        });
        
      }
      console.log("vectorSubject.value", vectorSubject.value.data.response);
      vectorSubject.value=vectorSubject.value.data.response;
      console.log("vectorSubject", vectorSubject.value);
    };

    const addSubject = async () => {
      try {
        const sessionStore = useSessionStore();
        const usuarioLogado = sessionStore.getSessionData;
        const matricula = usuarioLogado.matricula;
        const params = {
          matricula,
          materia: newSubject.value.materia,
          horas: newSubject.value.horas,
        };
        console.log(params);
        const response = await FaltasService(params).publicar();
        closeModal();
        fetchData();
        if (response.status == 201) {
          console.log('Matéria publicada com sucesso');
          $q.notify({
            color: 'green-10',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Matéria publicada com sucesso',
            position: 'top',
            timeout: 2000
          });
        } else {
          console.log('Erro ao publicar matéria:', response.data.message);
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
        console.error('Erro na publicação da matéria:', e);
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

    onMounted(() => {
      fetchData();
    });

    return {
      vectorSubject,
      modalVisible,
      newSubject,
      calculateLimiteFaltas,
      openRegisterModal,
      closeModal,
      subtractFalta,
      addFalta,
      fetchData,
      addSubject
    };
  },
};
</script>

<style scoped>
.q-page {
  background: #a5dbff31;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #74ff7426, #ffffff, #55bbff58);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #74ff7426, #ffffff, #55bbff58); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
}
.center-btn {
    margin-top: 20px;
    margin-bottom: 0px;
    display: flex;
    justify-content: center;
}

.cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.q-card {
    width: 400px;
}

.q-card-section .row h4 {
    max-width: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.row {
    display: flex;
}

.items-center {
    align-items: center;
}

.justify-between {
    justify-content: space-between;
}

.justify-around {
    justify-content: space-around;
}

.modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    width: 400px;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    box-align: center;
}

.modal-content .q-input {
    margin-bottom: 10px;
}

.modal-content .q-btn {
    margin-top: 10px;
}

.q-btn.q-mb-md {
    margin-left: 20px;
}

@media (max-width: 720px) {
.modal-content {

    width: 90vw;
  }
}
</style>