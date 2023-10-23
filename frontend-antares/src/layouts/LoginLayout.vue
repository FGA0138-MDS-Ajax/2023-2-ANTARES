<template>
  <div id="login" class="column items-center justify-center">
    <div class="background-image"></div>
    <q-card class="my-card">
      <q-card-section class="bg-blue text-white">
        <div class="text-h4 text-center">UnB na Mão</div>
        <div class="text-h6 text-center low-opacity">{{ registrando ? 'Registre-se' : 'Fazer login' }}</div>
        <div>
          <q-input filled v-if="registrando" v-model="email" dense class="bg-white q-mt-md" label="E-mail *"/>
          <q-input filled v-model="usuario" dense class="bg-white q-my-md" label="Usuário *"/>
          <q-select filled v-if="registrando" v-model="role" dense class="bg-white" :options="roleOptions" label="Tipo de Conta *"></q-select>
          <q-input filled v-model="senha" dense class="bg-white q-mt-md" label="Senha *" :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-pr-sm"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div v-if="registrando">
            <q-input filled v-model="confirmarSenha" dense class="bg-white q-mt-md" label="Confirmar Senha *" :type="isConfirmePwd ? 'password' : 'text'">
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
          <q-btn id="registrar" @click="telaRegistrar" flat class="text-white">Registrar-se</q-btn
          >
        </q-card-actions>
      </div>
      <div v-if="registrando">
        <q-card-actions class="bg-green row justify-around">
          <q-btn filled @click="registrar" flat class="text-white">Finalizar Cadastro</q-btn>
        </q-card-actions>
        <q-card-actions class="bg-blue row justify-around">
          <q-btn id="registrar" @click="cancelarRegistro" flat class="text-white">Cancelar</q-btn>
        </q-card-actions>
      </div>
    </q-card>
    <button filled v-if="!registrando" id="button" flat class="q-mt-sm bg-yellow-10 text-white q-pa-sm">
      Esqueci minha Senha
    </button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoginService from '../services/LoginService'
import { useQuasar } from 'quasar';
const router = useRouter();
const confirmarSenha = ref(null);
const registrando = ref(false);
const isPwd = ref(true);
const isConfirmePwd = ref(true);
const usuario  = ref(null);
const senha = ref(null);
const email = ref(null)

const $q = useQuasar()

const role = ref(null) as any;
const roleOptions = ref([
  { id: 2, label: 'Estudante' },
  { id: 3, label: 'Atlética' },
  { id: 4, label: 'Empresa Júnior' },
  { id: 5, label: 'Empresa Contratante' }
]);

function logar() {
  router.push('/home');
}

function telaRegistrar() {
  cleanForm()
  registrando.value = true;
}

function cancelarRegistro() {
  cleanForm()
  registrando.value = false;
}

const cleanForm = () => {
  usuario.value = null
  email.value = null
  senha.value = null
  confirmarSenha.value = null
  role.value = null
}

const createRegistrarObject = () => {
  const registroObject = {
    login: usuario.value,
    senha: senha.value,
    email: email.value,
    user_image: '',
    role: role.value.id
  }

  if(validarRegistro(registroObject)) {
    return registroObject
  } else {
    return false
  }
}

function validarRegistro(registroObject: any) {
  // Colocar Validações do Objeto Registrar Aqui
  console.log('validando : ' + JSON.stringify(registroObject))
  if (registroObject.email == null || registroObject.login == null || registroObject.senha == null || registroObject.role == null) {
    alert('Preencha todos os campos')
    return false
  }

  return true
}

async function registrar () {
  const requestRegistro = createRegistrarObject()
  if(requestRegistro == false) {
    return
  }
  try {
    const { registrar } = LoginService(requestRegistro)
    const response = await registrar()
    console.log('Response\n' + JSON.stringify(response))
    if(response.status == 201) {
      $q.notify({
        color: 'green-8',
        textColor: 'white',
        icon: 'remove',
        message: response.data.message,
        position: 'top',
      }); 
      registrando.value = false
    }
  } catch (error: any) {
      $q.notify({
        color: 'red-8',
        textColor: 'white',
        icon: 'remove',
        message: error.response.data.message,
        position: 'top',
      }); 
  }
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
