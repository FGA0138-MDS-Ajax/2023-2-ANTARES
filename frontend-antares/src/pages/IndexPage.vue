<template>
  <q-page>
    <div id="home-page" class="column items-center">
      <div class="q-mt-lg text-h1">Admin Page</div>
      <q-img id="home-img" class="q-mt-xl" src="~/assets/imgs/home-img.png"></q-img>
    </div>
  </q-page>
</template>

<script setup lang="ts">

</script>
<style scoped>
.q-page {
  background: #cfcfcf8f;  /* fallback for old browsers */
  
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