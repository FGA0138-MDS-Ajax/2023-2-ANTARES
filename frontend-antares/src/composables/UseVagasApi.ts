import { api } from 'src/boot/axios';

export default function usePublicarVagasApi(params: any) {
  const publicarVaga = async () => {
    try {
      const response = await api.post('/vagas', params);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return { publicarVaga };
}