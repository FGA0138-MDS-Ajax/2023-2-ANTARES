<template>
  <q-page>
    <div id="home-page" class="column items-center">
      <div class="q-mt-lg text-h2">Admin Page</div>
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

const logs = ref([]) as any;

onMounted(async () => {
  try{
    const { getLogs } = AdminService(null);
    const response = await getLogs();
    logs.value = response.data.logs;
    console.log(JSON.stringify(logs.value));
  }
  catch(error){
    console.log(error);
  }
});

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

@media (max-width: 720px) {
  .text-h1 {
    font-size: 80px!important;
    padding-left: 16px;
  }
}

.trace {
  width: 40vw;
  opacity: .5;
  height: 1px;
  background-color: #585858;
  margin: 10px 0;
}


</style>