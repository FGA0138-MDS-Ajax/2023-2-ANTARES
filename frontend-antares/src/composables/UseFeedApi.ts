import { api } from 'src/boot/axios';

export default function useFeedApi(_params: any) {

  const listarFeed = async () => {
    try {
      const response = await api.get('/feed');
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    listarFeed
  }
}