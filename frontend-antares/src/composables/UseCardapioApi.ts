import { api } from 'src/boot/axios';

export default function useCardapioApi(params: any) {

  const getAll = async () => {
    try {
      // Substitua a linha abaixo pela lógica real de chamada da API para obter todos os cardápios
      const response = await api.post('/getCardapio', params);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Adicione outras funções conforme necessário para interagir com a API do cardápio

  return {
    getAll
    // Adicione outras funções ao retorno conforme necessário
  };
}
