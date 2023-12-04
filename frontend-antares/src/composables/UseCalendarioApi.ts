import { api } from 'src/boot/axios';

export default function useCalendarioApi(params: any) {
  const publicarEvento = async () => {
    try {
      const response = await api.post('/calendario', params);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const getEventos = async () => {
    try {
      const response = await api.post('/eventos', params);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { publicarEvento, getEventos };
}