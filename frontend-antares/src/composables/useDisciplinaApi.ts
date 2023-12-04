import { api } from 'src/boot/axios';

export default function useFeedApi() {

  const listarDisciplinas = async () => {
    try {
      const response = await api.get('/disciplinas');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    listarDisciplinas, 
  }
}