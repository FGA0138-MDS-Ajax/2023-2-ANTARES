import { api } from 'src/boot/axios';
import { useSessionStore } from 'src/stores/session';

export default function useLoginApi(params: any) {

  const registrarUsuario = async () => {
    try {
      const response = await api.post('/usuarios', params);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const logarUsuario = async () => {
    try {
      const sessionStore = useSessionStore();
      const response = await api.post('/login', params );
      // console.log(JSON.stringify(response));
      const updateSessionData = () => {
        sessionStore.setSessionData(response.data.response);
      }
      updateSessionData()
      return response;
    } catch (error) {
      throw error;
    }
  }

  const editarUsuario = async () => {
    try {
      const response = await api.put('/usuarios', params);
      return response
    } catch (error) {
      throw error;
    }
  }

  return {
    registrarUsuario,
    logarUsuario,
    editarUsuario
  }
}
