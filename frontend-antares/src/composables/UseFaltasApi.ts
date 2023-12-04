import { api } from 'src/boot/axios';

export default function useFaltasApi(params: any) {

  const postarMateria = async () => {
    try {
      const response = await api.post('/faltas', params);
      return response;
    } catch (error) {
      throw error;
    }
  };
  const listarFaltas = async () => {
    try {
      const response = await api.post('/getFaltas', params);
      return response;
    } catch (error) {
      throw error;
    }
  }
  const atualizarFaltas = async () => {
    try {
      const response = await api.patch('/faltas', params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  return {
    postarMateria,
    listarFaltas,
    atualizarFaltas
  }
}