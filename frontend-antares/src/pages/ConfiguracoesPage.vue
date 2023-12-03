<template>
    <q-page>
        <div>
            <h2 class="text-center q-py-lg">Configurações</h2>
        </div>
        <div class="q-mt-md config-wrapper w100 column justify-center items-center">
            <q-input filled readonly v-model="sessionData.nome" label="Nome Completo" style="font-size: 16px" class="w20rem text-h6 low-opacity q-mb-md" />
            <q-input filled readonly v-model="sessionData.role" label="Tipo de Conta" style="font-size: 16px"  class="w20rem text-h6 low-opacity q-mb-md" />
            <q-input filled readonly v-model="sessionData.matricula" label="Matrícula" style="font-size: 16px"  class="w20rem text-h6 low-opacity q-mb-md" />
            <q-input filled readonly v-model="sessionData.email" style="font-size: 16px" label="Email" class="w20rem text-h6 low-opacity q-mb-md" />
            <q-input filled readonly v-model="sessionData.telefone" style="font-size: 16px" label="Telefone" mask="(##) ##### - ####" class="w20rem text-h6 low-opacity q-mb-md" />
            <q-input class="q-mb-md w20rem" outlined v-model="alterandoSenha" label="Alterar senha" type="password"/>
            <q-input class="w20rem" outlined v-model="confirmaSenha" label="Confirmar nova senha" type="password" />
        <div class="row no-wrap w100 justify-center">
            <div class="q-mt-md row items-center q-gutter-x-md no-wrap"  v-if="imgUser"> 
                <div class="low-opacity" style="font-size: 16px;">{{ fileName }}</div>
                <q-icon name="close" @click="removerImagem()" class="cursor-pointer" size="md" color="red"/>
            </div>
        </div>
        <q-btn class="q-mt-md" color="primary" :disable="!alterandoSenha || !confirmaSenha" @click="enviar()">Enviar</q-btn>
        </div>
    </q-page>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useSessionStore } from '../stores/session';
import { useQuasar } from 'quasar';
import LoginService from '../services/LoginService';

const sessionStore = useSessionStore();
const sessionData = computed(() => sessionStore.getSessionData) as any
const alterandoSenha = ref(null) as any
const confirmaSenha = ref(null) as any

const fileName = ref(null) as any
const imgUser = ref(null) as any

const $q = useQuasar()

async function enviar() {
    if(alterandoSenha.value !== confirmaSenha.value) {
        $q.notify({
            type: 'negative',
            message: 'As senhas não coincidem.',
            position: 'top'
        })
        return
    }
    try{
    const configuracao = {
        email: sessionData.value.email, 
        senha: alterandoSenha.value,
    }
    const { editar } = LoginService(configuracao)
    const response = await editar()
    if(response.status === 200) {
        $q.notify({
            type: 'positive',
            message: response.data.message,
            position: 'top'
        })
    }
    console.log(JSON.stringify(response))
    } catch(e: any) {
        $q.notify({
            type: 'positive',
            message: e.message,
            position: 'top'
        })
    }
}

function removerImagem() {
    imgUser.value = null
    fileName.value = null
}

</script>
<style scoped>
.q-page {
    background: #a5dbff31;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #74ff7426, #ffffff, #55bbff58);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #74ff7426, #ffffff, #55bbff58); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    
}

.config-wrapper{
    width: 10rem;
}

.w20rem {
    width: 20rem;   
}

</style>
