<template>
  <div id="login" class="column items-center justify-center">
    <div class="background-image"></div>
    <q-card class="my-card">
      <q-card-section class="bg-blue text-white">
        <div class="text-h4 text-center">UnB na Mão</div>
        <div class="text-h6 text-center low-opacity">{{ registrando ? 'Registre-se' : 'Fazer login' }}</div>
        <div>
          <q-input maxlength="50" filled v-if="registrando" v-model="nome" dense class="bg-white q-mt-md" label="Nome Completo *"/>
          <q-input maxlength="60" filled v-if="registrando" v-model="email" dense class="bg-white q-mt-md" label="E-mail *"/>
          <q-input
            maxlength="20"
            filled  
            @keyup.enter="logar"
            v-model="usuario"
            dense
            class="bg-white q-my-md"
            label="Usuário *"
          />
        
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
          <q-input maxlength="20" filled v-model="senha"
            @keyup.enter="logar"
            dense
            class="bg-white q-mt-md"
            label="Senha *"
            :type="isPwd ? 'password' : 'text'">
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
          <q-btn id="registrar" @click="telaRegistrar" flat class="text-white">Registrar-se</q-btn>
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
    <button @click="esqueciSenha" filled v-if="!registrando" id="button" flat class="q-mt-sm bg-yellow-10 text-white q-pa-sm">
      Esqueci minha Senha
    </button>
    <div v-if="modalEsqueciSenha" class="modal">
      <div class="modal-esqueci-senha rounded-borders">
        <div class="w100 row no-wrap justify-between items-center q-py-md">
          <div class="text-h5 q-pl-md">Redefinir Senha</div>
          <q-icon  name="close" size="lg" class="cursor-pointer q-pr-sm close" color="red" @click="esqueciSenha" />
        </div>
        <form v-if="!codigoEnviado" class="relative row no-wrap q-mb-md q-gutter-x-sm q-px-md  items-center">
          <q-input maxlength="60" name="user_email" autocomplete="on" required filled v-model="email" :readonly="codigoEnviado" dense class="bg-white w100" label="E-mail *"/>
          <q-btn @click="sendEmail()" id="codigo" dense class="bg-yellow-10 text-white">Enviar Código</q-btn>
        </form>
        <div  v-if="codigoEnviado && !novaSenha" class="q-px-md row no-wrap items-center justify-between q-mb-md">
          <p class="no-margin w100">Digite o código que foi enviado em seu email:</p>
          <q-input label="Código" maxlength="4" mask="####" outlined v-model="campoCodigo" dense class="bg-white "/>
        </div>
        <q-btn v-if="codigoEnviado && !novaSenha" :disable="!campoCodigo ||campoCodigo && campoCodigo.length < 4" @click="resetarSenha" class="bg-orange-8 text-white">Verificar Código</q-btn>
        <div v-if="novaSenha" class="q-px-md column no-wrap q-mb-md">
          <q-input label="Nova Senha" maxlength="20" v-model="senha" dense class="bg-white "/>
          <q-btn class="bg-green-5 text-white q-mt-md" @click="trocarSenha">Resetar a senha</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import emailjs from '@emailjs/browser';
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

const modalEsqueciSenha = ref(false)

const $q = useQuasar()

const role = ref(null) as any;
const roleOptions = ref([
  { id: 2, label: 'Estudante' },
  { id: 3, label: 'Atlética' },
  { id: 4, label: 'Empresa Júnior' },
  { id: 5, label: 'Empresa Contratante' }
]);

const codigoEnviado = ref(false)
const campoCodigo = ref(null) as any
const codigoGerado = ref(null) as any

const esqueciSenha = () => {
  modalEsqueciSenha.value = !modalEsqueciSenha.value
  email.value = null
  codigoEnviado.value = false
  campoCodigo.value = null
  novaSenha.value = false
}

const trocarSenha = async () => {
  try{
  const params = {
    email: email.value,
    senha: senha.value
  }
  const { editar } = LoginService(params)
  const response = await editar()
  if(response.status == 200) {
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'check',
      message: response.data.message,
      position: 'top',
    });
      setTimeout(()=> window.location.reload(), 1200)
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

const enviarCodigo = () => {
  codigoEnviado.value = true
}

function generateFourDigitCode() {
  // Gera um número aleatório entre 0 e 9999
  const randomNumber = Math.floor(Math.random() * 10000);

  // Formata o número para ter sempre 4 dígitos, adicionando zeros à esquerda se necessário
  const codigoGerado = randomNumber.toString().padStart(4, '1');

  return Number(codigoGerado);
}

function sendEmail() {
  codigoGerado.value = generateFourDigitCode()
  const emailData = {
    user_email: email.value,
    message: codigoGerado.value,
  };
  enviarCodigo();
  emailjs.send('service_nbmlzbe', 'template_sl5yvnd', emailData, 'KD15sQJ-xFghabjnw')
    .then((result) => {
      console.log('SUCCESS!');
    })
    .catch((error) => {
      console.log('FAILED...');
    });
}

const novaSenha = ref(false)
const resetarSenha = () => {
  if(campoCodigo.value == codigoGerado.value) {
    $q.notify({
      color: 'green-8',
      textColor: 'white',
      icon: 'check',
      message: 'Código Correto',
      position: 'top',
    }); 
    novaSenha.value = true
  } else {
    $q.notify({
      color: 'red-8',
      textColor: 'white',
      icon: 'warning',
      message: 'O código digitado está incorreto.',
      position: 'top',
    });
    setTimeout(() => {
      window.location.reload()
    }, 1000);
  }
}

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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(5px);
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-esqueci-senha{
  background-color: #fafafa;
  width: 35rem;
}

.close:hover {
  opacity: 0.8;
  transition: all 0.2s;
}

#codigo {
  width: 40%;
}

.message-codigo{
  width: 3px;
  color: #0000000c;
}

</style>
