<template>
    <div class="modal">
      <div v-if="!codigoEnviado && !novaSenha" class="modal-header">
        <p class="row text-h5 justify-center q-pt-md">
          Coloque seu Email
        </p>
        <div class="row no-wrap justify-center q-gutter-x-md q-mb-md">
          <q-input
            dense
            filled
            label="E-mail:"
            placeholder="Digite aqui"
            v-model="email"
          />
          <q-btn
            align="around"
            class="btn-fixed-width"
            color="orange"
            label="Enviar"
            icon="lightbulb_outline"
            @click="enviarEmail"
          />
        </div>
      </div>
  
      <div v-else-if="codigoEnviado && !novaSenha" class="modal-header">
        <p class="row text-h5 justify-center q-pt-md">
          Digite o Código
        </p>
        <div class="row no-wrap justify-center q-gutter-x-md q-mb-md">
          <q-input
            dense
            filled
            label="Código:"
            placeholder="Digite o código recebido"
            v-model="codigo"
          />
          <q-btn
            align="around"
            class="btn-fixed-width"
            color="orange"
            label="Enviar"
            icon="lightbulb_outline"
            @click="enviarCodigo"
          />
        </div>
      </div>
      <div v-else-if="codigoEnviado && novaSenha" class="modal-header">
      <p class="row text-h5 justify-center q-pt-md">
        Definir Nova Senha
      </p>
      <div class="row no-wrap justify-center q-gutter-x-md q-mb-md">
        <q-input
          dense
          filled
          label="Nova Senha:"
          placeholder="Digite a nova senha"
          type="password"
          v-model="novaSenhaInput"
        />
        <q-input
          dense
          filled
          label="Confirme a Senha:"
          placeholder="Confirme a nova senha"
          type="password"
          v-model="confirmarSenhaInput"
        />
        <q-btn
          align="around"
          class="btn-fixed-width"
          color="orange"
          label="Enviar"
          icon="lightbulb_outline"
          @click="enviarNovaSenha"
        />
      </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
    const email = ref('');
    const codigo = ref('');
    const codigoEnviado = ref(false);
    const novaSenhaInput = ref('');
    const confirmarSenhaInput = ref('');
    const novaSenha = ref(false);
  
    function enviarEmail() {
    // Lógica para enviar o email
    // Após enviar o email, altere o valor de codigoEnviado para true
    codigoEnviado.value = true;
    }

    function enviarCodigo() {
    // Lógica para enviar o código por email
    // Após enviar o código, altere o valor de codigoEnviado para true
    novaSenha.value = true;
    }

    function enviarNovaSenha() {
    // Lógica para validar e enviar a nova senha
    // Verifique se as senhas correspondem e estão nos critérios desejados
    // Se a nova senha estiver correta, faça as alterações necessárias no backend
    // Altere o valor de novaSenha para true para mostrar uma tela de confirmação
    }

  </script>
  
  <style scoped>
  .modal-header {
    background-color: #fff;
    width: 40rem;
  }
  </style>
  