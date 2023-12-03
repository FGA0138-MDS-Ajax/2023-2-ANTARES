import { defineStore } from 'pinia';

export const useSessionStore = defineStore('session', {
  getters: {
    getSessionData: (_state) => {
      const loginSession = localStorage.getItem('loginSession');
      return loginSession ? JSON.parse(loginSession) : [];
    },
  },
  actions: {
    setSessionData(newData: any) {
      localStorage.setItem('loginSession', JSON.stringify(newData));
    },
    clearSessionData() {
      localStorage.removeItem('loginSession'); 
    },
  },
});
