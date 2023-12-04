<template>
  <q-page>
    <div class="w100 q-mt-lg text-h2 text-center">Admin Page</div>
    <div class="row justify-center items-center">
      <q-btn flat label="Atualizar link cardápio" class="bg-orange-8 text-white button-prev shadow-1" icon="refresh" @click="openRegisterModal"/>
    </div>
    <div v-if="isModalOpen" class="modal">
      <div class="w100 row justify-between no-wrap">
        <div class="text-h5">Atualizar link do cardápio</div>
        <q-icon class="cursor-pointer transition" size="lg" @click="fecharModal" name="close" color="red"/>
      </div>
      <div class="q-gutter-lg q-mt-md">
      <q-select filled v-model="role"  class="bg-white" :options="roleOptions" label="Campus *"></q-select>
      <q-input v-model="linkCardapio" filled label="Link do Cardápio *"></q-input>
        <div class="w100 row justify-center">
          <q-btn @click="cadastrarLink" label="Cadastrar" :disable="!role || !linkCardapio" class="bg-blue-9 text-white cadastrar-button"></q-btn>
        </div>
      </div>
    </div>

    <div class="column w100 q-py-lg q-mt-md" style="position:relative">
      <div  class="card-log row no-wrap items-center justify-between" v-for="(log, index) in logs" :key="index">
        <div class="column q-pl-md">
          <div class="text-bold">{{ log.titulo }}</div>
          <div class="trace"></div>
          <div class="w50">{{ log.descricao }}</div>
        </div>
        <q-icon :name="log.icon" size="md" color="primary"/>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AdminService from '../services/AdminService';
import CardapioService from '../services/CardapioService';
import { useQuasar } from 'quasar';

const logs = ref([]) as any;

const linkCardapio = ref(null) as any;

const $q = useQuasar();

const role = ref(null) as any;
const isModalOpen = ref(false);

const fecharModal = () => {
  linkCardapio.value = null
  role.value = null
  isModalOpen.value = false;
}

onMounted(async () => {
  try {
    const { getLogs } = AdminService(null);
    const response = await getLogs();
    logs.value = response.data.logs;
    console.log(JSON.stringify(logs.value));
  }
  catch (error) {
    console.log(error);
  }
});
const roleOptions = ref([
  { id: 2, label: 'Campus Gama' },
  { id: 3, label: 'Campus Darcy Ribeiro' },
  { id: 4, label: 'Campus Planaltina' },
  { id: 5, label: 'Campus Ceilandia' },
  { id: 6, label: 'Campus Fazenda' },
]);
async function cadastrarLink() {
  try {
    const params = {
      campus: role.value.label,
      link: linkCardapio.value
    }

    const response = await CardapioService(params).create();

    if (response.status == 201) {
      console.log('Vaga publicada com sucesso');
      $q.notify({
        color: 'green-10',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Evento publicada com sucesso',
        position: 'top',
        timeout: 2000
      });
      fecharModal();
    } else {
      console.log('Erro ao publicar evento:', response.data.message);
      $q.notify({
        color: 'red-10',
        textColor: 'white',
        icon: 'warning',
        message: response.data.message,
        position: 'top',
        timeout: 3000
      });
    }


  } catch (error) {
    console.error('Erro ao cadastrar link do cardápio:', error);
  }
}

function openRegisterModal() {
  isModalOpen.value = true;
}
function closeRegisterModal() {
  isModalOpen.value = false;
}

</script>
<style scoped>
.q-page {
  background: #cfcfcf8f;  /* fallback for old browsers */
  overflow-x: hidden;
}

#home-page {
  width: 100vw!important;
}

#home-img {
  width: 350px;
  height: 500px;
}

.card-log {
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  margin: 10px;

}


.trace {
  width: 40vw;
  opacity: .5;
  height: 1px;
  background-color: #585858;
  margin: 10px 0;
}

.button-prev{
  display:flex;
  height: 2vh;
  background-color: rgba(255, 255, 255, 0.5);
  border: rgba(1, 233, 250, 0.5);
  justify-content: center;
  margin-top: 30px;
  
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #fff;
  z-index: 1000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
} 

.cadastrar-button{
  justify-content: center;
}

@media (max-width: 720px) {
  .text-h1 {
    font-size: 80px!important;
    padding-left: 16px;
  }
  .modal {
    width: 90vw;
  }
}
</style>