import { api } from 'src/boot/axios';

export default function useLoginApi(params: any) {

  const registrarUsuario = async () => {
    try {
      const response = await api.post('/usuarios', params);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    registrarUsuario,
  }
}
