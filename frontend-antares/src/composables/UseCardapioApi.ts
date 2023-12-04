import { api } from 'src/boot/axios';

export default function useCardapioApi(params: any) {

  const getAll = async () => {
    try {
      const response = await api.post('/getCardapio', params);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const create = async () => {
    try {
      const response = await api.post('/Cardapio', params);
      return response;
    } catch (error) {
      throw error;
    }
  };

  

  return {
    getAll,
    create

  };
}
