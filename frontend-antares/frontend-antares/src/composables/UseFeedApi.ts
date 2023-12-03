import { api } from 'src/boot/axios';

export default function useFeedApi(params: any) {

  const listarFeed = async () => {
    try {
      const response = await api.post('/feed', params);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    listarFeed
  }
}