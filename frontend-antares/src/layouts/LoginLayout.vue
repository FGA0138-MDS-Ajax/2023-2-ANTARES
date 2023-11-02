<template>
  <div id="login" class="column items-center justify-center">
    <div class="background-image"></div>
    <q-card class="my-card">
      <q-card-section class="bg-blue text-white">
        <div class="text-h4 text-center">UnB na Mão</div>
        <div class="text-h6 text-center low-opacity">{{ registrando ? 'Registre-se' : 'Fazer login' }}</div>
        <div>
          <q-input maxlength="50" filled v-if="registrando" v-model="nome" dense class="bg-white q-mt-md" label="Nome Completo *"/>
          <q-input maxlength="40" filled v-if="registrando" v-model="email" dense class="bg-white q-mt-md" label="E-mail *"/>
          <q-input maxlength="20" filled v-model="usuario" dense class="bg-white q-my-md" label="Usuário *"/>
          <q-input
            filled
            class="bg-white q-my-md"
            dense
            v-if="registrando"
            v-model="telefone"
            label="Telefone *"
            maxlength="17"
            mask="(##) ##### - ####"
            unmasked-value
          />
          <q-select filled v-if="registrando" v-model="role" dense class="bg-white" :options="roleOptions" label="Tipo de Conta *"></q-select>
          <q-input maxlength="20" filled v-model="senha" dense class="bg-white q-mt-md" label="Senha *" :type="isPwd ? 'password' : 'text'">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer q-pr-sm"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div v-if="registrando">
            <q-input filled maxlength="20" v-model="confirmarSenha" dense class="bg-white q-mt-md" label="Confirmar Senha *" :type="isConfirmePwd ? 'password' : 'text'">
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
const confirmarSenha = ref(null);
const registrando = ref(false);
const isPwd = ref(true);
const isConfirmePwd = ref(true);
const usuario  = ref(null);
const telefone = ref(null) as any
const senha = ref(null);
const nome = ref(null)
const email = ref(null)

const $q = useQuasar()

const role = ref(null) as any;
const roleOptions = ref([
  { id: 2, label: 'Estudante' },
  { id: 3, label: 'Atlética' },
  { id: 4, label: 'Empresa Júnior' },
  { id: 5, label: 'Empresa Contratante' }
]);

async function logar() {
  try {
    const params = {
      login: usuario.value,
      senha: senha.value
    }
    const response = await LoginService(params).login()
    if(response.status == 201) {
      window.location.reload()
    } else {
      $q.notify({
      color: 'red-10',
      textColor: 'white',
      icon: 'warning',
      message: response.data.message,
      position: 'top',
    });
    senha.value = null
    }
  } catch (e) {
    $q.notify({
      color: 'red-9',
      textColor: 'white',
      icon: 'warning',
      message: 'Erro de Conexão',
      position: 'top',
    });
    console.log(e)
  }
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
  telefone.value = null
  senha.value = null
  confirmarSenha.value = null
  role.value = null
}

const createRegistrarObject = () => {
  if(role.value == null) {
    $q.notify({
      color: 'yellow-9',
      textColor: 'white',
      icon: 'warning',
      message: 'Preencha todos os campos',
      position: 'top',
    });
    return false
  }
  if( telefone.value == null || telefone.value.length != 11 || telefone.value.trim() == '') {
    $q.notify({
      color: 'yellow-9',
      textColor: 'white',
      icon: 'warning',
      message: 'Preencha o Telefone com DDD\nEx: (12) 34567 - 8901',
      position: 'top',
    });
    return false
  }
  const registroObject = {
    nome: nome.value,
    login: usuario.value,
    senha: senha.value,
    email: email.value,
    telefone: telefone.value,
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
  if (registroObject.email == null || registroObject.login == null || registroObject.telefone == null || registroObject.senha == null || registroObject.nome == null || registroObject.nome.trim() == '') {
    $q.notify({
      color: 'yellow-9',
      textColor: 'white',
      icon: 'warning',
      message: 'Preencha Todos os Campos Obrigatórios',
      position: 'top',
    });
    return false;
  } else if (registroObject.senha != confirmarSenha.value && registrando.value) {
    $q.notify({
      color: 'yellow-9',
      textColor: 'white',
      icon: 'warning',
      message: 'As Senhas Não Coincidem',
      position: 'top',
    });
    return false
  } else if (/\s/.test(registroObject.senha)) {
    $q.notify({
      color: 'yellow-9',
      textColor: 'white',
      icon: 'warning',
      message: 'A Senha não deve conter espaços em branco',
      position: 'top',
    });
    return false;
  }
   else if (registroObject.senha.trim() == '') {
    $q.notify({
      color: 'yellow-9',
      textColor: 'white',
      icon: 'warning',
      message: 'Senha no Formato Inválido',
      position: 'top',
    });
    return false;
  } else if (!isValidEmail(registroObject.email)) {
    $q.notify({
      color: 'yellow-9',
      textColor: 'white',
      icon: 'warning',
      message: 'E-mail Inválido',
      position: 'top',
    });
    return false;
  } else if ( registroObject.senha.length < 6 || registroObject.senha.length > 20 ) {
    $q.notify({
      textColor: 'white',
      color: 'yellow-9',
      icon: 'warning',
      message: 'A Senha Deve Conter entre 6 e 20 caracteres',
      position: 'top',
    });
    return false;
  }

  return true;
}

function isValidEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
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
        icon: 'check',
        message: response.data.message,
        position: 'top',
      }); 
      registrando.value = false
    }
  } catch (error: any) {
      $q.notify({
        color: 'red-8',
        textColor: 'white',
        icon: 'warning',
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
