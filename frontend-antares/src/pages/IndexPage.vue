<template>
  <q-page>
    <div id="home-page" class="column items-center">
      <div class="q-mt-lg text-h1">Página Inicial</div>
      <q-img id="home-img" class="q-mt-xl" src="~/assets/imgs/home-img.png"></q-img>
    </div>
  </q-page>
</template>

<script setup lang="ts">

</script>
<style scoped>
.q-page {
  background: #56cbf28f;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #2f81ed3f, #56cbf23f);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #2f81ed3f, #56cbf23f); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  
}

#home-page {
  width: 100vw!important;
}

#home-img {
  width: 350px;
  height: 500px;
}

@media (max-width: 720px) {
  .text-h1 {
    font-size: 80px!important;
    padding-left: 16px;
  }
}

</style>