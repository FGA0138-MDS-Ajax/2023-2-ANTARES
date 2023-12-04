<template>
    <q-page>
        <h2 class="text-center q-py-lg">Controle de faltas</h2>
        <q-btn label="Adicionar matéria" @click="openRegisterModal()" class="text-white bg-blue-7 q-mb-md q-ml-md" />
        <div class="cards q-gutter-md q-mt-md">
            <q-card class="cursor-pointer justify-between q-px-md no-wrap" v-for="(subject, index) in vectorSubject"
                :key="index">
                <q-card-section class="column">
                    <div class="row items-center justify-between">
                        <h4 class="q-mb-md">{{ subject.nome }}</h4>
                        <h8 class="low-opacity">{{ subject.cargaHoraria }} horas</h8>
                    </div>
                    <div class="row items-center justify-between">
                        <h8 class="w100" style="opacity:0.8">Faltas: {{ subject.faltas }}</h8>
                        <q-btn label="-" class="text-white bg-blue-7 q-mb-md" @click="subtractFalta(index)" />
                        <q-btn label="+" class="text-white bg-blue-7 q-mb-md" @click="addFalta(index)" />
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div v-if="modalVisible" class="modal-background">
            <div class="modal-content q-pa-md">
                <h4 class="text-h6">Adicionar Matéria</h4>
                <q-form @submit="addSubject">
                    <q-input v-model="newSubject.nome" label="Nome" />
                    <q-input v-model="newSubject.cargaHoraria" label="Carga Horária" />
                    <q-btn type="submit" label="Adicionar" class="text-white bg-blue-7 q-mb-md" />
                </q-form>
                <q-btn label="Fechar" color="primary" @click="closeModal" />
            </div>
        </div>
    </q-page>
</template>

<script>
import { ref } from 'vue';
export default {
    data() {
        return {
            vectorSubject: [
                { nome: 'Matéria 1', cargaHoraria: 10, faltas: 0, },
                { nome: 'Matéria 2', cargaHoraria: 15, faltas: 2, },
            ],
            modalVisible: false,
            newSubject: {
                nome: '',
                cargaHoraria: '',
                faltas: 0,
            },
        };
    },
    methods: {
        openRegisterModal() {
            this.modalVisible = true;
        },
        closeModal() {
            this.modalVisible = false;
            this.newSubject.nome = '';
            this.newSubject.cargaHoraria = '';
        },
        subtractFalta(index) {
            if (this.vectorSubject[index].faltas > 0) {
                this.vectorSubject[index].faltas -= 1
            }
        },
        addFalta(index) {
            this.vectorSubject[index].faltas += 1
        },
        addSubject() {
            this.vectorSubject.push({
                nome: this.newSubject.nome,
                cargaHoraria: this.newSubject.cargaHoraria,
                faltas: 0,
            });
            this.newSubject.nome = '';
            this.newSubject.cargaHoraria = '';
            this.closeModal();
        },
    }
}

</script>

<style scoped>
.cards {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.q-card {
    width: 400px;
}
.q-card-section .row h4 {
  max-width: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row {
    display: flex;
}

.items-center {
    align-items: center;
}

.justify-between {
    justify-content: space-between;
}

.justify-around {
    justify-content: space-around;
}
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: rgba(0, 0, 0, 0.5); 
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: #fff;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.modal-content .q-input {
  margin-bottom: 10px;
}

.modal-content .q-btn {
  margin-top: 10px; 
}
.q-btn.q-mb-md {
  margin-left: 20px;
}
</style>