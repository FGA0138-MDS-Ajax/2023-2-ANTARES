<template>
  <div id="login" class="column items-center justify-center">
    <div class="background-image"></div>
    <q-card class="my-card">
      <q-card-section class="bg-blue text-white">
        <div class="text-h4 text-center">UnB na Mão</div>
        <div class="text-h6 text-center low-opacity">Fazer login</div>
        <div>
          <q-input v-if="registrando"
              v-model="email"
              dense
              class="bg-white q-mt-md"
              label="E-mail"
            />
          <q-input
            v-model="usuario"
            dense
            class="bg-white q-my-md"
            label="Usuário"
          />
          <q-input
            v-model="senha"
            dense
            class="bg-white"
            label="Senha"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-pr-sm"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div v-if="registrando">
            <q-input
              v-model="confirmarSenha"
              dense
              class="bg-white q-mt-md"
              label="Confirmar Senha"
              :type="isConfirmePwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer q-pr-sm"
                  @click="isConfirmePwd = !isConfirmePwd"
                />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <div v-if="!registrando">
        <q-card-actions class="bg-green row justify-around">
          <q-btn flat class="text-white" @click="logar">Entrar</q-btn>
        </q-card-actions>
        <q-card-actions class="bg-blue row justify-around">
          <q-btn id="registrar" @click="telaRegistrar" flat class="text-white"
            >Registrar-se</q-btn
          >
        </q-card-actions>
      </div>
      <div v-if="registrando">
        <q-card-actions class="bg-green row justify-around">
          <q-btn flat class="text-white">Registrar-se</q-btn>
        </q-card-actions>
        <q-card-actions class="bg-blue row justify-around">
          <q-btn id="registrar" @click="cancelarRegistro" flat class="text-white"
            >Cancelar</q-btn
          >
        </q-card-actions>
      </div>
    </q-card>
    <button v-if="!registrando" id="button" flat class="q-mt-sm bg-yellow-10 text-white q-pa-sm">
      Esqueci minha Senha
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const confirmarSenha = ref(null);
const registrando = ref(false);
const isPwd = ref(true);
const isConfirmePwd = ref(true);
const usuario  = ref(null);
const senha = ref(null);
const email = ref(null)

function logar() {
  router.push('/home');
}

function telaRegistrar() {
  registrando.value = true;
}
function cancelarRegistro() {
  registrando.value = false;
}
</script>
<style scoped>
* {
  overflow: hidden !important;
}

#login {
  width: 100vw;
  height: 100vh;
  /* Remova o background-image do #login */
  position: relative; /* Adicione position: relative; */
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('assets/imgs/login-bg.jpg');
  background-size: cover;
  animation: zoom 60s linear infinite;
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.q-btn {
  width: 100%;
  height: 100%;
}

#button {
  position: absolute;
  bottom: 40px;
  outline: none;
  border: none;
  opacity: 0.95;
  transition: all 0.2s;
  cursor: pointer;
  z-index: 0;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

#registrar {
  font-size: 0.8rem;
  opacity: 0.6;
  transition: all 0.2s;
}

q-btn:hover,
#button:hover {
  opacity: 1;
}

.q-card {
  width: 25rem;
}

@media (max-width: 425px) {
  .q-card {
    width: 90vw;
  }
}

@media (max-width: 800px) {
  .background-image {
    animation: none !important;
  }
}
</style>
