import { api } from 'src/boot/axios';

export default function useFeedApi(params: any) {

  const carregarLogs = async () => {
    try {
      const response = await api.get('/admin');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    carregarLogs
  }
}