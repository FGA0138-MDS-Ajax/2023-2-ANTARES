<template>
  <div>
    <div class="row justify-center items-center">
      <q-btn flat icon="event" label="Adicionar Evento" class="w20rem bg-green-5 text-white q-my-md button-prev" @click="openRegisterModal"/>
    </div>
        <q-calendar-agenda
        v-model="selectedDate"
        ref="calendar"  
        view="week-agenda"
        :weekdays="[0,1,2,3,4,5,6]"
        animated
        bordered
        hide-header
        transition-prev="slide-right"
        transition-next="slide-left"
        short-weekday-label 
        locale="pt-br"
        :day-min-height="0"
        @click-date="onClickDate"
        @change="onChange"
        @moved="onMoved"
        @click-time="onClickTime"
        @click-interval="onClickInterval"
        @click-head-intervals="onClickHeadIntervals"
        @click-head-day="onClickHeadDay"
        >
      </q-calendar-agenda>
      <div class="q-mt-md w100 row justify-center q-gutter-x-md items-center">
        <h5 class="text-center q-py-md low-opacity">Meus Eventos</h5>
      </div>
      <div v-if="!agenda || agenda.length < 1" class="w100 row no-wrap justify-center item-center">
        <p class="low-opacity q-mt-md" style="font-size: 18px;">Nenhum evento registrado ainda</p>
      </div>
      <div class="row q-gutter-md q-pb-md">
        <div v-for="(evento, index) in agenda" :key="index" class="card-data bg-blue-3" style="position:relative">
          <div class="column justify-center items-center q-pt-lg">
            <div class="text-bold">{{evento.titulo}}</div>
            <div>{{ evento.dataEvento ? formatar(evento.dataEvento) : 'Data fail' }}</div>
          </div>
          <q-icon name="close" class="transition cursor-pointer absolute-right" color="red" size="md"/>
        </div>
      </div>
      <div v-if="isModalOpen" class="modal">
        <div class="modal-title">
          <q-icon name="close" class="absolute-right cursor-pointer transition q-pt-md q-pr-sm" @click="closeRegisterModal" size="lg" color="red"/>
          <h4 class="register-title">Adicionar Evento</h4>
        </div>
          <q-input v-model="titulo" class="q-mb-sm" label="Título do evento *" maxlength="30"/>
          <q-input filled v-model="registerDate" class="q-mb-sm" label="Data do evento *" readonly>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" @click="openDatePicker" />
            </template>
          </q-input>
          <q-input filled v-model="registerHour" class="q-mb-sm" label="Hora do evento *" readonly>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer" @click="openHourPicker" />
            </template>
          </q-input>
          <div class="">
            <q-btn label="Adicionar" :disable="!titulo || titulo.trim() == '' || !registerDate || !registerHour" class="bg-green-7 register-add" @click="addEvent"/>
          </div>
        </div>
        <div v-if="datePicker" class="calendar">
          <q-date v-model="registerDate" mask="DD-MM-YYYY">
            <div class="row items-center justify-end">
              <q-btn label="Confirmar" color="primary" flat @click="handleDateOk" />
            </div>
          </q-date>
        </div>
        <div v-if="hourPicker" class="calendar">
          <q-time v-model="registerHour" mask="HH:mm">
            <div class="row items-center justify-end">
              <q-btn label="Confirmar" color="primary" flat @click="handleHourOk" />
            </div>
          </q-time>
      </div>
  </div>
</template>

  
<script lang="ts" setup>
    import { QCalendarAgenda, today } from '@quasar/quasar-ui-qcalendar/dist/index.umd'
    import {onBeforeMount, ref, reactive} from 'vue';
    import '@quasar/quasar-ui-qcalendar/src/QCalendarAgenda.sass'
    import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
    import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
    import { format } from 'date-fns';
    import { useSessionStore } from '../stores/session';
    import CalendarioService from '../services/CalendarioService';
    import { useRouter } from 'vue-router';
    import { useQuasar } from 'quasar';

    const selectedDate = ref(Date());
    const registerDate = ref(null) as any;
    const registerHour = ref(null) as any;
    const isModalOpen = ref(false);
    const calendar = ref(null) as any;
    const titulo = ref(null) as any;
    const datePicker = ref(false);
    const hourPicker = ref(false);
    const router = useRouter();
    const $q = useQuasar();

    //let agenda: Record<number, any[]> = {};
    const agenda = ref(null) as any;

    const fetchEvents = async () => {
    try {
      const date = ref(today());
      console.log('date', date);
      const sessionStore = useSessionStore();
      const userLogged = sessionStore.getSessionData;
      const loginUser = {login: userLogged.matricula, dataEvento: date.value.toString()};
      console.log('req: ', JSON.stringify(loginUser));
      const response = await CalendarioService(loginUser).getEventos();
      console.log('response', response);
      agenda.value = response.data.calendario.eventos;

      console.log('agenda', JSON.stringify(agenda.value) + '\nDataconvertida: ' + selectedDate.value);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

    function openDatePicker () {
      datePicker.value = true;
      console.log('openDateTimePicker', datePicker.value)
    };
    function openHourPicker () {
      hourPicker.value = true;
    };
    const handleDateOk = () => {
      //dataEvento.value = registerDay.value;
      datePicker.value = false;
    };
    const handleHourOk = () => {
      //dataEvento.value = registerHour.value;
      hourPicker.value = false;
    };

    function calendarPrev(){
      calendar.value.prev();
    };
    function calendarNext() {
      calendar.value.next();
    };
    function onClickDate (data : any) {
      selectedDate.value = data.scope.timestamp.date;

    }
    function onMoved (data : any) {
      console.log('onMoved', data)
    };
    function onToday () {
      calendar.value.moveToToday()
    };
    function onChange (data : any) {
      console.log('onChange', data)
    };
    function onClickTime (data : any) {
      console.log('onClickTime', data)
    };
    function onClickInterval (data : any) {
      console.log('onClickInterval', data)
    };
    function onClickHeadIntervals (data : any) {
      console.log('onClickHeadIntervals', data)
    };
    function onClickHeadDay (data : any) {
      console.log('onClickHeadDay', data)
    }
    function openRegisterModal() {
      isModalOpen.value = true;
    }
    function closeRegisterModal() {
      isModalOpen.value = false;
    }
    function formatDate(){
      const selectedDateTime = new Date();
      const [day, month, year] = registerDate.value.split('-');
      selectedDateTime.setDate(parseInt(day, 10));
      selectedDateTime.setMonth(parseInt(month, 10) - 1);
      selectedDateTime.setFullYear(parseInt(year, 10));
      const [hours, minutes] = registerHour.value.split(':');
      selectedDateTime.setHours(parseInt(hours, 10));
      selectedDateTime.setMinutes(parseInt(minutes, 10));
      selectedDateTime.setSeconds(0);
      const formattedDate = format(selectedDateTime, 'dd-MM-yyyy HH:mm:ss');
      return formattedDate;
    }

    function formatar(dataEvento: string) {
    const data = new Date(dataEvento);

    const formattedDate = format(data, 'dd/MM/yyyy HH:mm');
    return formattedDate;
  }

    const publicarVaga = async () => {
        try {
          const sessionStore = useSessionStore();
          const userLogged = sessionStore.getSessionData;
          const login = userLogged.matricula;
          const params = {
            login,
            titulo: titulo.value,
            dataEvento: formatDate().toString(),
          };
          console.log(params);
          const response = await CalendarioService(params).publicar();
          if (response.status == 201) {
            console.log('Evento publicado com sucesso');
            $q.notify({
              color: 'green-10',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Evento publicado com sucesso',
              position: 'top',
              timeout: 2000
            });
            await fetchEvents();
          } else {
            console.log('Erro ao publicar evento:', response.data.message);
            $q.notify({
              color: 'red-10',
              textColor: 'white',
              icon: 'warning',
              message: response.data.message,
              position: 'top',
              timeout: 3000
            });
          }
        } catch (e) {
          console.error('Erro na publicação de evento:', e);
          $q.notify({
            color: 'red-9',
            textColor: 'white',
            icon: 'warning',
            message: 'Erro de Conexão',
            position: 'top',
            timeout: 3000
          });
        }
    };
    async function addEvent(){
      await publicarVaga();
      titulo.value = null
      registerDate.value = null
      registerHour.value = null
      isModalOpen.value = false
    }
    onBeforeMount ( async () => {
      await fetchEvents();
    });


</script>

<style scoped>

.time-agenda{
  font-size: 14px;
  color: #000000;
  font-weight: bold;
  margin-top: 0px;
}

.Calendar{
  padding: 10px;
  margin: 0;
  max-width: flex-direction; 
  max-height: 100%;
}

.button-prev{
  width:  49.5%;
  height: 2vh;
  background-color: rgba(255, 255, 255, 0.5);
  border: rgba(1, 233, 250, 0.5);
}
.button-next{
  width:  50%;
  height: 2vh;
  background-color: rgba(255, 255, 255, 0.5);
}

.button-adicionar{
  width:  100%;
  height: 2vh;
  background-color: rgba(255, 255, 255, 0.5);
}

.card-data{

  width: 20rem;
  height: 100px;
  border: 2px solid rgba(0, 0, 0, 0.35);
  border-radius: 6px;
}
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  width: 30rem;
  z-index: 1000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 40px;
  cursor: pointer;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}
.register-title{
  text-align: center;
  font-size: 20px;
  margin: 0;
  padding: 0;
  font-weight: bold;
}
.register-add{
  width:  100%;
  height: 2vh;
  background-color: rgba(50, 218, 50, 0.651);
  color: #fff;
  border-top: 100%;
  padding: 0px;
}

.calendar {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  padding: 20px;
  background-color: #fff;
  justify-content: center; 
  align-items: center;
}
.modal-footer{
  margin-top: 50px;
}
.w20rem {
  width: 20rem;
}
@media (max-width: 1200px) {
  .modal{
    backdrop-filter: blur(5px);
    width: 90%;
  }

}

</style>