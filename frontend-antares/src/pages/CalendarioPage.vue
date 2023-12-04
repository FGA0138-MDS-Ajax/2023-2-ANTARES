<template>
  <q-page>
    <h2 class="w100 text-center q-py-lg">Calendário</h2>
    <div class="column q-px-lg q-gutter-y-md">
      <CalendarComponent>
      </CalendarComponent>
    </div>
  </q-page>
  </template>
  
  <script lang="ts" setup>
    import CalendarComponent from '../components/CalendarComponent.vue'

  </script>
  
  <style scoped>
  .q-page {
    background: #a5dbff31;
    background: -webkit-linear-gradient(to top, #74ff7426, #ffffff, #55bbff58);
    background: linear-gradient(to top, #74ff7426, #ffffff, #55bbff58);
  }

  </style>