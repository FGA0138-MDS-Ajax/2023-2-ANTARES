<template>
    <q-page>
      <!-- Conteúdo da página da disciplina -->
      <h1>Detalhes da Disciplina</h1>
      <p>Código da Disciplina: {{ codigoDisciplina }}</p>
      <!-- Outros detalhes da disciplina -->
    </q-page>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const codigoDisciplina = ref(route.params.codigo);
  
  </script>
  