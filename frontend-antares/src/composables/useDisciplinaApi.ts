import { api } from 'src/boot/axios';

export default function useFeedApi() {

  const listarDisciplinas = async () => {
    try {
      const response = await api.get('/disciplinas');
      console.log('listarDisciplinas', response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    listarDisciplinas
  }
}