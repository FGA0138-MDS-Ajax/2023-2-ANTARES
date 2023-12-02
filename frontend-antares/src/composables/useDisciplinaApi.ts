import { api } from 'src/boot/axios';

export default function useDisciplinaApi() {
  const listarDisciplinas = async () => {
    console.log('listarDisciplinas');
    try {
      const response = await api.get('/disciplinas');
      return response;
    } catch (error) {
      throw error;
    }
  };

  console.log('useDisciplinaApi: ', listarDisciplinas);
  return {
    listarDisciplinas
  };
}
